import { useState, useCallback, useEffect, useRef } from "react";

const App = () => {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const passwordRef = useRef(null);

  const copyPassword = () => {
    window.navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 500);
  };

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+";

    for (let i = 1; i < length; i++) {
      const character = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(character);
    }

    setCopied(false);

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  useEffect(() => {
    generatePassword();
  }, [length, numberAllowed, charAllowed]);

  return (
    <div className="flex items-center justify-center w-full h-svh">
      <div className="w-full max-w-md px-4 py-3 text-orange-500 bg-gray-800 rounded-lg shadow-md">
        <h1 className="my-3 text-lg font-semibold text-center text-white uppercase">
          Password Generator
        </h1>
        <div className="flex mb-4 overflow-hidden rounded-lg shadow">
          <input
            type="text"
            value={password}
            className={`w-full px-3 py-1 outline-none cursor-pointer ${
              copied ? "text-green-400" : "text-orange-500"
            }  transition-colors`}
            placeholder="Password"
            readOnly
            ref={passwordRef}
            onClick={copyPassword}
          />
          <button
            onClick={copyPassword}
            className={`outline-none bg-blue-700 
             px-3 py-0.5 shrink-0 ${
               copied ? "text-green-400" : "text-white"
             } transition-colors w-20 capitalize`}
          >
            {copied ? "copied" : "copy"}
          </button>
        </div>
        <div className="flex justify-between text-sm">
          <div className="flex items-center gap-x-1 min-w-52">
            <input
              type="range"
              min={6}
              max={20}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setLength(e.target.value)}
              name=""
              id=""
            />
            <label htmlFor="length">length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="number">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="character">Characters</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
