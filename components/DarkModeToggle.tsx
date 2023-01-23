import React from 'react';
import useDarkMode from 'use-dark-mode';
import Toggle from 'react-toggle'

const DarkModeToggle = () => {
  // const darkMode = useDarkMode();

  return (
    <div className="flex gap-2">
      {/*<button type="button" onClick={darkMode.disable}>*/}
      {/*  ☀*/}
      {/*</button>*/}
      {/*<Toggle checked={darkMode.value} onChange={darkMode.toggle} />*/}
      {/*<button type="button" onClick={darkMode.enable}>*/}
      {/*  🌑*/}
      {/*</button>*/}
    </div>
  );
};

export default DarkModeToggle;
