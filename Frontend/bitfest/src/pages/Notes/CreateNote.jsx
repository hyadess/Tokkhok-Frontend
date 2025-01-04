import { useNavigate, useParams } from "react-router";
import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import MDEditor from "@uiw/react-md-editor";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
const BASE_URL = 'https://buet-genesis.onrender.com';

export default function CreateNote() {
  const navigate = useNavigate();
  const [value, setValue] = useState("**Hello world!!!**");
  const [saving, setSaving] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false); // New state
  const [translatedText, setTranslatedText] = useState("");
  const { userId } = useAuth();

  const uploadNote = async () => {
    try {
      setIsTranslating(true); // Start translation
      const res = await axios.post(`${BASE_URL}/api/v1/translation/generate`, {
        text: value,
        translated_text: "",
        user_id: userId
      });
      console.log(res.data);
      setTranslatedText(res.data.translated_text);
    } catch (error) {
      console.error("Error during translation:", error);
    } finally {
      setIsTranslating(false); // End translation
    }
  };
  // print translated text


  const saveTranslatedText = async () => {
    try {
      setSaving(true); // Start saving
//      const translatedText2= `
// ### রবীন্দ্রনাথ ঠাকুর: একজন কিংবদন্তী বাঙালি কবি, দার্শনিক, এবং নোবেল বিজয়ী

// রবীন্দ্রনাথ ঠাকুর (১৮৬১-১৯৪১) ছিলেন একজন বিখ্যাত বাঙালি কবি, চিন্তাবিদ, ও মানবিক। তিনি বিশ্বকবি বলে পরিচিত। তিনি প্রথম এশিয়ান কবি যিনি ১৯১৩ সালে নোবেল পুরস্কার জয় করেন তার "গীতাঞ্জলি" কবিতাগুচ্ছের জন্য।

// *জীবন ও শিল্প:*
// - ঠাকুরের শিল্প বহুমাত্রিক—কবি, উপন্যাসিক, গানের লেখক, ও চিত্রশিল্পী।
// - তিনি গ্রাম উন্নয়ন, শিক্ষা ও সামাজিক অবশিষ্ট যত্ন দিয়েছিলেন।
// - শান্তিনিকেতন (বিশ্বভারতী বিশ্ববিদ্যালয়) তিনি স্থাপন করেছেন, যা এখনো তার ধারণা ও মানবিকতার প্রতীক।

// *প্রধান রচনা:*
// - *গীতাঞ্জলি*: কবিতাগুচ্ছ যা নোবেল জয় করেছিল।
// - *ঘরে-বাইরে*: ভারতের স্বাধীনতা আন্দোলন ও সামাজিক পরিবর্তন নিয়ে লেখা একটি উপন্যাস।
// - *চোখের বালি*: সামাজিক সমস্যা ও মেয়েদের অবস্থান নিয়ে রচনা।

// *রবীন্দ্রনাথের প্রভাব:*
// ঠাকুরের চিন্তাধারা ও শিল্প শুধু ভারতে নয়, সমগ্র বিশ্বে একটি প্রচুর প্রভাব ফেলেছে। তার রচনা মানুষের মন ও চেতনায় জাগরণ ঘটায়।

// *ঠাকুরের ঐতিহ্য:*
// - রবীন্দ্রনাথের লেখা আজকের প্রাসঙ্গিক, ও তার গান ও কবিতা বাঙালি সংস্কৃতির প্রতীক।

// "Where the mind is without fear and the head is held high..." এই লাইনটি আজকের স্বাধীনতা ও মানবিক উন্নতির প্রতীক।

// *রবীন্দ্রনাথকে নিয়ে কথাই শেষ হয় না, তিনি ছিলেন, আজও আছেন বাঙালি জীবনের প্রাণের মাঝে।*
// `;
      



      const res = await axios.post(`${BASE_URL}/api/v1/files/`, {
        uploader_id: userId,
        status: "Completed",
        privacy_status: "private",
        tags: [],
        image_url: "string",
        text: translatedText,
      });
      console.log("translated text I got:", translatedText);
      console.log(res.data);
      alert("Translated text saved successfully!");
    } catch (error) {
      console.error("Error saving translated text:", error);
    } finally {
      setSaving(false); // End saving
    }
  };

  return (
    <div>
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
        className="w-full-max-w-10 dark:bg-slate-800"
      >
        {isTranslating ? (
          <h2>Translating...</h2>
        ) : saving ? (
          <h2>Saving...</h2>
        ) : (
          <div>
            <h2 className="mb-4 text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl dark:text-white">
              Note Editor
            </h2>

            <div
              style={{
                width: "70vw",
                minHeight: "60vh",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <MDEditor
                value={value}
                onChange={setValue}
                className="mb-4"
              />

              <button
                type="button"
                className="focus:outline-none text-white font-semibold bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900"
                onClick={uploadNote}
              >
                Translate
              </button>

              {translatedText && (
                <div
                  className="mt-4 p-4 text-white bg-black rounded-md"
                  style={{
                    minHeight: "20vh",
                    overflowY: "auto",
                  }}
                >
                  <h3 className="text-lg font-bold mb-2">Translated</h3>
                  <MDEditor.Markdown source={translatedText} />
                </div>
              )}

              {translatedText && (
                <button
                  type="button"
                  className="mt-4 focus:outline-none text-white font-semibold bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-green-900"
                  onClick={saveTranslatedText}
                >
                  Save
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
