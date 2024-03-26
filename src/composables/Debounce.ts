const debounce = (cb: Function, delay: number) => {
  let timeout: any;
  
  return (...args: any[]) => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      cb(...args);
    }, delay);
  };
};

export {
  debounce
}