import { useNavigate, useParams } from "react-router";
import React, { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { Spinner, ToggleSwitch } from "flowbite-react";
import Navbar from "../../components/navbar/Navbar";
// import Navigation from "../../components/Navigation";
import { AiOutlineSave } from "react-icons/ai";
import { CgRemove } from "react-icons/cg";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
const BASE_URL = 'http://127.0.0.1:8000';
//https://stackoverflow.com/questions/7925050/is-there-a-multivalued-field-type-available-in-postgresql
//HOW TO ADD Arrays in POSTGRE
export default function CreateNote() {
  const navigate = useNavigate();
  const urlParams = useParams();
  const {buldrUser} = useAuth();
  const [prvt, setPrvt] = useState(false);
  const [value, setValue] = useState("**Hello world!!!**");
  const [title, setTitle] = useState(urlParams.title);
  const [image, setImage] = useState(null);
  const [subtitle, setSubtitle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [tagVal, setTagVal] = useState();
  const [chosenColor, setChosenColor] = useState("indigo");
  const [tags, setTags] = useState([]);

  let topic = urlParams.topic;
  const getData = () => {
    // db.collection(topic).doc(title).get().then(a=>{
    //     if(a.exists){let data=a.data()
    //     setImage(data.image)
    //     setSubtitle(data.subtitle)
    //     setValue(data.blog)}
    // }).then(()=>{
    //     setLoading(false)
    // })
  };
  const uploadNote = async () => {
    let tgs = [];
    tags.forEach((a) => tgs.push(a.name));
    const res = await axios.post(BASE_URL + "/note", {
      userID: buldrUser,
      title,
      subtitle,
      image,
      content: value,
      prvt: prvt,
      tags: tgs,
    });
    // some dummy data
    
    console.log(res.data);
    setSaving(false);
  };
  const RemoveTag = (index) => {
    delete tags[index];
    let newTags = [];
    tags.forEach((a) => {
      if (a) {
        newTags.push(a);
      }
    });
    setTags(newTags);
  };
  React.useEffect(() => {
    const d = new Date();
    console.log(d.getDate(), d.getMonth(), d.getFullYear());
    getData();
  }, []);
  return (
    <div>
      <Navbar />
      {/* <Navigation /> */}
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
        {!saving && (
          <div>
            <div>
              <h2 className="mb-4 text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl dark:text-white">
                Note Editor{" "}
              </h2>
            </div>

            {!loading && (
              <div
                style={{
                  width: "70vw",
                  minHeight: "60vh",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <input
                  type="text"
                  class="block w-full mb-2 p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <input
                  type="text"
                  class="block w-full mb-2 p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Subtitle"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                />
                <input
                  type="text"
                  class="block w-full mb-2  p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Image"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
                <div className="flex items-start justify-center">
                  <input
                    type="text"
                    class="block w-full mr-2 p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Tag Name"
                    value={tagVal}
                    onChange={(e) => setTagVal(e.target.value)}
                  />
                  {/* <select onChange={e=>setChosenColor(e.target.value)} class="bg-gray-50 p-4 h-full border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                        <option selected>Choose a color</option>
                        {colors.map(a=>
                        ( <option value={a}>
                                <div className={`h-4 flex items-center bg-${a}-500`}>
                                    <p className={`text-sm text-${a}-700`}>{a}</p>
                                </div>
                            </option>)
                        )}
                    </select> */}
                  <button
                    type="button"
                    class="focus:outline-none p-4 ml-2 text-white font-semibold bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm dark:focus:ring-yellow-900"
                    onClick={() => {
                      setTags((tags) => [
                        ...tags,
                        { color: chosenColor, name: tagVal },
                      ]);
                    }}
                  >
                    Add
                  </button>
                </div>
                <div className="flex my-2">
                  {tags.map((a, idx) => (
                    <label class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      <span
                        className={`bg-${a.color.color}-100 text-${a.color}-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-${a.color}-200 dark:text-${a.color}-800`}
                      >
                        {a.name}
                        <CgRemove
                          className="dark:text-gray ml-1 dark:hover:text-white"
                          onClick={() => {
                            RemoveTag(idx);
                          }}
                        />
                      </span>
                    </label>
                  ))}
                </div>
                <ToggleSwitch
                  className="md:mx-4 md:my-4 my-2"
                  label="Private"
                  checked={prvt}
                  onChange={() => setPrvt((prvt) => !prvt)}
                />

                <div data-color-mode={localStorage.getItem("color-theme")}>
                  <div className="wmde-markdown-var"> </div>
                  <MDEditor value={value} onChange={setValue} />
                </div>
                <a href="/mynotes">
                <button
                  type="button"
                  class="focus:outline-none text-white font-semibold bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900"
                  onClick={() => {
                    setSaving(true);
                    console.log(title);
                    console.log(subtitle);
                    uploadNote();
                    // window.location.reload();
                    alert("Note Saved");
                    // navigate("/mynotes");
                  }}
                >
                  Save
                  </button>
                </a>
              </div>
            )}
            {loading && (
              <div
                elevation={5}
                style={{
                  zIndex: "5",
                  width: "80vw",
                  minHeight: "50vh",
                  margin: "5vh 0",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "50px",
                }}
              >
                <Spinner />
                <p fontFamily="Oswald">Loading ....</p>
              </div>
            )}
          </div>
        )}

        {saving && <h2>saving....</h2>}
      </div>
    </div>
  );
}
