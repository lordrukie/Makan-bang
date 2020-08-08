const DrawerInitiator = {
  init({ button, drawer, body }) {
    button.addEventListener('click', (event) => {
      this._toogleDrawer(event, drawer);
    });

    body.addEventListener('click', (event) => {
      this._closeDrawer(event, drawer);
    });
  },

  _toogleDrawer(event, drawer) {
    event.stopPropagation();
    drawer.classList.toggle('open');
  },

  _closeDrawer(event, drawer) {
    event.stopPropagation();
    drawer.classList.remove('open');
  },
};

export default DrawerInitiator;
