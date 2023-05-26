import ReactGA from 'react-ga4';

// init google analytics
export const initGA = (): void => {
  ReactGA.initialize(process.env.NEXT_PUBLIC_GA_TRACKING_ID as string);
};
// analizar vista de paginas
export const logPageView = (): void => {
  ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
};
// analizar eventos como botones o acciones
export const logEvent = (category: string, action: string): void => {
  ReactGA.send({ hitType: 'event', eventCategory: category, eventAction: action });
};