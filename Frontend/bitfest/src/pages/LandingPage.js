import Navbar from "../components/Navbar"
import landingpage1 from '../resources/images/landiing1.webp'
import landingpage2 from '../resources/images/landing2.webp'
import landingpage3 from '../resources/images/landing3.jpg'
import landingpage4 from '../resources/images/landing4.png'

const LandingPage = ()=>{

    return(
        <div>           
            <Navbar />
            <div className="w-[100%] md:h-[75vh] bg-[#cadcf8]">
                <div className="w-[100%] grid grid-cols-1 md:grid-cols-[55%_45%] h-[100%] ">

                    <div className="w-[100%] h-[100%] ">
                        <img src={landingpage1} alt="landing1" className="w-full h-full object-cover"></img>
                    </div>

                    <div className="w-[100%] h-[100%]">
                        <div className="flex items-center h-[100%] p-4">
                            <div>
                                <p className="text-[60px] text-[#343b3d] text-center md:text-justify font-bold leading-[60px]">WELCOME LEARNER,<br></br> TO CODE TUTOR</p>
                                <p className="w-[70%] text-[#3d4547] leading-5 color-gray text-center md:text-justify font-medium text-[22px] my-3">
                                    BOOST YOUR LEARNING USING OUR MULTIMODAL CHATBOT
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-[100%] md:h-[75vh]  bg-[#02adda]">
                <div className="w-[100%] grid grid-cols-1 md:grid-cols-[45%_55%] h-[100%]">

                    <div className="w-[100%] h-[100%] md:order-last">
                        <div className="w-[100%] h-[100%] ">
                            <img src={landingpage2} alt="landing1" className="w-full h-full object-cover"></img>
                        </div>
                    </div>
                    <div className="w-[100%] h-[100%]">
                        <div className="flex justify-end items-center h-[100%] p-4">
                          
                            <div className="md:w-[70%]">
                                <p className="text-center md:text-right text-[60px] text-[#3a3f42] font-bold leading-[60px]">CREATE QUIZ, AND <br></br>TEST YOURSELF</p>
                                {/* <p className="text-center md:text-right  text-[#3d4547] leading-5 font-medium text-[22px] my-3">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuad
                                </p> */}
                            </div>
                        </div>
                    </div>
                   
                </div>
            </div>

            <div className="w-[100%] md:h-[75vh] bg-[#54a0cc]">
                <div className="w-[100%] grid grid-cols-1 md:grid-cols-[55%_45%] h-[100%]">

                    <div className="flex justify-center items-center">
                        <div className="w-[80%] h-[70%] ">
                            <img src={landingpage4} alt="landing1" className="w-full h-full object-cover"></img>
                        </div>
                    </div>

                    <div className="w-[100%] h-[100%] ">
                        <div className="flex justify-center items-center h-[100%] p-4">
                            <div>
                                <p className="text-[56px] text-[#343b3d] text-center md:text-justify font-bold leading-[60px]">GET SUGGESTION &<br></br> SHARPEN YOUR KNOWLEDGE</p>
                                {/* <p className="w-[70%] text-[#3d4547]  text-center leading-5 md:text-justify font-medium text-[22px] my-3">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis  malesuada. Nullam vehicula, lorem quis 
                                </p> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-[100%] md:h-[75vh] bg-[#607398]">
                <div className="w-[100%] grid grid-cols-1 md:grid-cols-2 h-[100%]">
                    
                    <div className="w-[100%] h-[100%]  md:order-last">
                        <div className="flex justify-center items-center h-[100%]">
                            <div className="w-[100%] h-[70%] ">
                                <img src={landingpage3} alt="landing1" className="w-full h-full object-cover"></img>
                            </div>
                        </div>
                    </div>
                    <div className="w-[100%] h-[100%]">
                        <div className="flex justify-center items-center h-[100%]">
                            <div className="md:w-[70%]">
                                <p className="md:text-right text-center text-[60px] text-[#e8ecee] font-bold leading-[60px]">CREATE LECTURES,<br></br>TEACH OTHERS</p>
                                {/* <p className="md:text-right text-center text-[#c3ced1] leading-5 font-medium text-[22px] my-3">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuad
                                </p>  */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <footer
                className="bg-neutral-200 text-center dark:bg-neutral-700 lg:text-left">
                <div className="p-4 text-center text-neutral-700 dark:text-neutral-200">
                    © 2024 Copyright:  
                    <a
                    className="text-neutral-800 dark:text-neutral-400"
                    href="https://tw-elements.com/"
                    >  Code Tutor</a>
                </div>
             </footer>
        </div>
    )
}

export default LandingPage