// Instance the tour
const tour = new Tour({
  debug: true,
  orphan: true,
  storage: window.localStorage,
  basePath: location.pathname.slice(0, location.pathname.lastIndexOf('/')),
});
tour.addStep({
  path: '/#!/',
  element: '#avatars',
  title: 'Welcome to Cards for Humanity',
  content: 'to continue click next else endtour',
  placement: 'bottom'
});
tour.addStep(
  {
    path: '/#!/',
    element: '#card-list',
    title: 'How to Play',
    content: 'The game is all about selecting a card for with answer to the question that the Czar asks. Below cards summarises the experience.How to win? Just make sure you get the right answer.',
    placement: 'top'
  });
tour.addStep({
  path: '/#!/',
  element: '#sign-up',
  title: 'Play Game',
  content: ' Click to sign up and start game or Play as guest',
  placement: 'bottom'
});
tour.addStep({
  path: '/#!/',
  element: '.wpb-text',
  title: 'What is CFH',
  content: 'A game with purpose to help others.',
  placement: 'top',
});
tour.addStep(
  {
    path: '/#!/',
    element: '.crDonated',
    title: 'Donation',
    content: 'Do not forget to Donate',
    placement: 'top'
  });
tour.addStep({
  path: '/#!/app/',
  element: '#inner-info',
  title: 'Game',
  content: 'This is where the game happens. Has a timer on the left to time each question. You can abandon the game using button on top-right. Enjoy!',
  placement: 'top',
  onNext() {
    document.location.href = '/#!/';
  },
});
tour.addStep({
  path: '/#!/',
  element: '#avatars',
  title: 'End',
  content: 'The End',
  placement: 'bottom',
});
// Initialize the tour
tour.init();

// Start the tour
tour.start().goTo(0);

// to be called on click to restart tour
const restartTour = {
  restart: () => {
    tour.restart();
  }
};
