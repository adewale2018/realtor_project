import mixpanel from 'mixpanel-browser';

mixpanel.init(process.env.REACT_APP_MIXPANEL_KEY);

let env_check =
  process.env.NODE_ENV === 'development' ||
  process.env.NODE_ENV === 'production';

export const actions = {
  identify: (id) => {
    if (env_check) mixpanel.identify(id);
  },
  alias: (id) => {
    if (env_check) mixpanel.alias(id);
  },
  track: (name, props) => {
    if (env_check) mixpanel.track(name, props);
  },
  people: {
    set: (props) => {
      if (env_check) mixpanel.people.set(props);
    },
  },
};
