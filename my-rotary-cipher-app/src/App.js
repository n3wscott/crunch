// src/App.jsx
import React, {useState, useEffect, useCallback} from 'react';
import {RotaryCipher} from './RotaryCipher';
import Dial from './Dial'; // Import the new Dial component
import './App.css'; // Styles will be heavily updated

function App() {
    const [blueKey, setBlueKey] = useState('a');
    const [redKey, setRedKey] = useState('a');
    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');
    const [mode, setMode] = useState('encode'); // 'encode' or 'decode'
    const [keyDetails, setKeyDetails] = useState('Key details will appear here once valid keys are entered.');
    const [error, setError] = useState('');

    const getCipherInstance = useCallback(() => {
        if (blueKey.length !== 1 || redKey.length !== 1 || !/^[a-z]$/.test(blueKey) || !/^[a-z]$/.test(redKey)) {
            const errorMsg = "Error: Keys must be single lowercase letters (a-z).";
            setError(errorMsg);
            return null;
        }
        setError('');
        try {
            return new RotaryCipher(blueKey, redKey);
        } catch (e) {
            const errorMsg = "Error initializing cipher: " + e.message;
            setError(errorMsg);
            return null;
        }
    }, [blueKey, redKey]);

    useEffect(() => {
        const cipher = getCipherInstance();
        if (!cipher) {
            setOutputText('');
            return;
        }
        if (mode === 'encode') {
            setOutputText(cipher.encode(inputText));
        } else {
            setInputText(cipher.decode(outputText))
        }
        // if (inputText) {
        //     setOutputText(mode === 'encode' ? cipher.encode(inputText) : cipher.decode(inputText));
        // } else if (outputText) {
        //     setOutputText(mode === 'encode' ? cipher.encode(inputText) : cipher.decode(inputText));
        // } else {
        //     setOutputText('');
        // }
    }, [inputText, outputText, mode, getCipherInstance]);

    useEffect(() => {
        const cipher = getCipherInstance();
        if (cipher) {
            setKeyDetails(cipher.getPrintableKey(mode));
        } else {
            setKeyDetails("Please enter valid keys (a-z) to see key details.");
        }
    }, [mode, getCipherInstance]);

    const toggleMode = () => {
        setMode(prevMode => prevMode === 'encode' ? 'decode' : 'encode');
    };

    return (
        <div className="container machine-bg"> {/* Added machine-bg class for overall theme */}
            <h1>Rotary Cipher Machine</h1>

            {error && <div className="error-message">{error}</div>}

            <div className="controls-panel"> {/* New wrapper for top controls */}
                <div className="key-dials"> {/* Wrapper for the dials */}
                    <Dial
                        label="Red Key"
                        color="red"
                        value={redKey}
                        onChange={setRedKey} // Pass the setter directly
                    />
                    <Dial
                        label="Blue Key"
                        color="blue"
                        value={blueKey}
                        onChange={setBlueKey} // Pass the setter directly
                    />
                </div>
            </div>

            <div className="io-panel"> {/* Wrapper for input/output text areas */}
                <div className="text-io input-section">
                    <label htmlFor="inputText">Message</label> {/* Changed label */}
                    <textarea
                        id="inputText"
                        placeholder="DATA STREAM INPUT..." // Themed placeholder
                        value={inputText}
                        onChange={(e) => {
                            setMode("encode")
                            setInputText(e.target.value)
                        }}
                    />
                </div>

                <div className="text-io output-section">
                    <label htmlFor="outputText">Encoded Message</label> {/* Changed label */}
                    <textarea
                        id="outputText"
                        placeholder="TRANSMISSION OUTPUT..." // Themed placeholder
                        value={outputText}
                        onChange={(e) => {
                            setMode("decode")
                            setOutputText(e.target.value)
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
