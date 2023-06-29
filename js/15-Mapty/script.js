'use strict';

class Workout {
  date;
  id;

  constructor(coords, distance, duration, date, id) {
    this.coords = coords; // [lat, lng]
    this.distance = +distance; // in km
    this.duration = +duration; // in min
    date ? (this.date = date) : (this.date = new Date());
    id ? (this.id = id) : (this.id = (Date.now() + '').slice(-10));
  }

  _setDescription() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }
}

class Running extends Workout {
  type = 'running';

  constructor(coords, distance, duration, cadence, date, id) {
    super(coords, distance, duration, date, id);
    this.cadence = +cadence;
    this.calcPace();
    this._setDescription();
  }

  calcPace() {
    // min/km
    this.pace = this.duration / this.distance;
    return this.pace;
  }

  changeType() {
    return new Cycling(
      this.coords,
      +this.distance,
      +this.duration,
      0,
      this.date,
      id
    );
  }
}

class Cycling extends Workout {
  type = 'cycling';

  constructor(coords, distance, duration, elevation, date, id) {
    super(coords, distance, duration, date, id);
    this.elevation = +elevation;
    // this.type = 'cycling';
    this.calcSpeed();
    this._setDescription();
  }

  calcSpeed() {
    // km/h
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }

  changeType() {
    return new Running(
      this.coords,
      +this.distance,
      +this.duration,
      0,
      this.date,
      this.id
    );
  }
}

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class App {
  #map;
  #mapZoomLevel = 13;
  #mapEvent;
  #workouts = [];
  #markers = [];
  #openedUpdateForm;
  #workoutToUpdate;
  #typeChange = false;

  constructor() {
    // Get user's position
    this._getPosition();

    // Get data from local storage
    this._getLocalStorage();

    // Attach event handlers
    form.addEventListener('submit', this._newWorkout.bind(this));
    containerWorkouts.addEventListener(
      'change',
      this._toggleElevationFieldEvent.bind(this)
    );
    containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
    containerWorkouts.addEventListener('click', this._deleteWorkout.bind(this));
    containerWorkouts.addEventListener(
      'click',
      this._showUpdateForm.bind(this)
    );
    containerWorkouts.addEventListener(
      'submit',
      this._updateWorkout.bind(this)
    );

    containerWorkouts.addEventListener(
      'change',
      this._changeWorkoutTypeChangeFlag.bind(this)
    );
  }

  _getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert('Could not get your position');
        }
      );
  }

  _loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;

    const coords = [latitude, longitude];

    this.#map = L.map('map').setView(coords, this.#mapZoomLevel);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // Handling clicks on map
    this.#map.on('click', this._showForm.bind(this));

    this.#workouts.forEach(work => {
      this._renderWorkoutMarker(work);
    });
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _hideForm() {
    // Empty inputs
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        '';

    form.style.display = 'none';
    form.classList.add('hidden');
    setTimeout(() => (form.style.display = 'grid'), 1000);
  }

  _toggleElevationFieldEvent(e) {
    if (e.target.classList.contains('form__input--type')) {
      const form = e.target.closest('.form');
      this.#toggleElevationField(form);
    }
  }

  #toggleElevationField(form) {
    const elevation = form.querySelector('.form__input--elevation');
    const cadence = form.querySelector('.form__input--cadence');
    elevation.closest('.form__row').classList.toggle('form__row--hidden');
    cadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _changeWorkoutTypeChangeFlag(e) {
    if (e.target.classList.contains('form__input--type'))
      if (e.target.closest('.form').classList.contains('form__update'))
        this.#typeChange
          ? (this.#typeChange = false)
          : (this.#typeChange = true);
  }

  _newWorkout(e) {
    const validInputs = (...inputs) =>
      inputs.every(inp => Number.isFinite(inp));
    const allPositive = (...inputs) => inputs.every(inp => inp > 0);

    e.preventDefault();

    // Get data from form
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    const { lat, lng } = this.#mapEvent.latlng;
    let workout;

    // If workout running, create running object
    if (type === 'running') {
      const cadence = +inputCadence.value;

      // Check if data is valid
      if (
        // !Number.isFinite(distance) ||
        // !Number.isFinite(duration) ||
        // !Number.isFinite(cadence)
        !validInputs(distance, duration, cadence) ||
        !allPositive(distance, duration, cadence)
      )
        return alert('Inputs have to be positive numbers!');

      workout = new Running([lat, lng], distance, duration, cadence);
    }

    // If workout cycling, create cycling object
    if (type === 'cycling') {
      const elevation = +inputElevation.value;

      if (
        !validInputs(distance, duration, elevation) ||
        !allPositive(distance, duration)
      )
        return alert('Inputs have to be positive numbers!');

      workout = new Cycling([lat, lng], distance, duration, elevation);
    }

    // Add new object to workout array
    this.#workouts.push(workout);

    // Render workout on map as marker
    this._renderWorkoutMarker(workout);

    // Render workout on list
    this._renderWorkout(workout);

    // Hide form + clear input fields
    this._hideForm();

    // Set local storage to all workouts
    this._setLocalStorage();
  }

  _renderWorkoutMarker(workout) {
    const marker = L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(
        `${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`
      )
      .openPopup();
    this.#markers.push(marker);
  }

  _renderWorkout(workout) {
    let html = `
      <li class="workout workout--${workout.type}" data-id="${workout.id}">
        <form class="form form__update overflow">
          <div class="form__row">
            <label class="form__label">Type</label>
            <select class="form__input form__input--type">
              <option value="running">Running</option>
              <option value="cycling">Cycling</option>
            </select>
          </div>
          <div class="form__row">
            <label class="form__label">Distance</label>
            <input
              class="form__input form__input--distance"
              placeholder="km"
            />
          </div>
          <div class="form__row">
            <label class="form__label">Duration</label>
            <input
              class="form__input form__input--duration"
              placeholder="min"
            />
          </div>

          <div class="form__row">
            <label class="form__label">Cadence</label>
            <input
              class="form__input form__input--cadence"
              placeholder="step/min"
            />
          </div>
          <div class="form__row form__row--hidden">
            <label class="form__label">Elev Gain</label>
            <input
              class="form__input form__input--elevation"
              placeholder="meters"
            />
          </div>
        <button class="form__btn">OK</button>
      </form>
        <h2 class="workout__title">${workout.description}</h2>
        <div class="workout__btns">
            <div class="workout__btn workout__btn--edit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="icon edit__icon"
              >
                <path
                  class="edit__icon--storke"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                />
              </svg>
            </div>

            <div class="workout__btn workout__btn--delete">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="icon delete__icon"
              >
                <path
                  class="delete__icon--storke"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </div>
          </div>
        <div class="workout__details">
          <span class="workout__icon">${
            workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
          }</span>
          <span class="workout__value">${workout.distance}</span>
          <span class="workout__unit">km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⏱</span>
          <span class="workout__value">${workout.duration}</span>
          <span class="workout__unit">min</span>
        </div>
    `;

    if (workout.type === 'running')
      html += `
        <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${workout.pace.toFixed(1)}</span>
          <span class="workout__unit">min/km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">🦶🏼</span>
          <span class="workout__value">${workout.cadence}</span>
          <span class="workout__unit">spm</span>
        </div>
      </li>
      `;

    if (workout.type === 'cycling')
      html += `
        <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${workout.speed.toFixed(1)}</span>
          <span class="workout__unit">km/h</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⛰</span>
          <span class="workout__value">${workout.elevation}</span>
          <span class="workout__unit">m</span>
        </div>
      </li>
      `;

    form.insertAdjacentHTML('afterend', html);
  }

  _moveToPopup(e) {
    if (!this.#map) return;

    const workoutEl = e.target.closest('.workout');

    if (!workoutEl) return;

    const workout = this.#workouts.find(
      work => work.id === workoutEl.dataset.id
    );

    this.#map.setView(workout.coords, this.#mapZoomLevel, {
      animate: true,
      pan: {
        duration: 1,
      },
    });
  }

  _setLocalStorage() {
    localStorage.setItem('workouts', JSON.stringify(this.#workouts));
  }

  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem('workouts'));
    if (!data) return;
    this.#workouts = data.map(el => {
      let workout =
        el.type === 'running'
          ? new Running(el.coords, +el.distance, +el.duration, +el.cadence)
          : new Cycling(el.coords, +el.distance, +el.duration, +el.elevation);
      workout.id = el.id;
      return workout;
    });
    this.#workouts.forEach(work => {
      this._renderWorkout(work);
    });
  }

  _showUpdateForm(e) {
    const selectedElClass = e.target.classList;
    if (
      selectedElClass.contains('edit__icon') ||
      selectedElClass.contains('edit__icon--storke')
    ) {
      this.#typeChange = false;
      const workoutEl = e.target.closest('.workout');
      this.#workoutToUpdate = this.#workouts.find(
        el => el.id === workoutEl.dataset.id
      );
      if (!this.#workoutToUpdate) return;
      const updateForm = workoutEl
        .closest('.workout')
        .querySelector('.form__update');
      if (this.#workoutToUpdate.type === 'cycling')
        this.#toggleElevationField(updateForm);

      this.#setWorkoutValuesToUpdateForm(updateForm);
      updateForm.classList.remove('overflow');
      if (this.#openedUpdateForm)
        this.#openedUpdateForm.classList.add('overflow');
      this.#openedUpdateForm = updateForm;
    }
  }

  #setWorkoutValuesToUpdateForm(updateForm) {
    const updateElements = updateForm.querySelectorAll('.form__input');
    updateElements.forEach(el => {
      const input = el.classList.value.split('--')[1];
      if (!this.#workoutToUpdate[input]) return;
      el.value = this.#workoutToUpdate[input];
    });
  }

  _updateWorkout(e) {
    e.preventDefault();
    if (!e.target.classList.contains('form__update')) return;
    if (this.#typeChange)
      this.#workoutToUpdate = this.#workoutToUpdate.changeType();
    const inputs = this.#openedUpdateForm.querySelectorAll('.form__input');
    inputs.forEach(el => {
      const inputName = el.classList.value.split('--')[1];
      if (el.value) this.#workoutToUpdate[inputName] = el.value;
    });
    // this._setLocalStorage();
    // this.#openedUpdateForm.classList.add('overflow');
    // this.#openedUpdateForm = null;
    // this.#workoutToUpdate = null;
    // this.#typeOfUpdateWorkoutIsChanged = false;
  }

  _deleteWorkout(e) {
    const selectedElClass = e.target.classList;
    if (
      selectedElClass.contains('delete__icon') ||
      selectedElClass.contains('delete__icon--storke')
    ) {
      const workout = e.target.closest('.workout');
      const index = this.#workouts.findIndex(
        el => el.id === workout.dataset.id
      );
      this.#workouts.splice(index, 1);
      workout.remove();
      const marker = this.#markers.splice(index, 1)[0];
      this.#map.removeLayer(marker);
      this._setLocalStorage();
    }
  }
}

const app = new App();
