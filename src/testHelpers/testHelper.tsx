export const findByTestAtrr = (component: any, attr: string) => {
  const wrapper = component.find(`[test-attr='${attr}']`);
  return wrapper;
};
