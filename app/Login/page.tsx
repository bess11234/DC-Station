"use client"
import axios from 'axios';
import Cat from "./script";
import './style.css'


interface FormValues {
    username: string;
    password: string;
    remember: boolean;
  }

export default function Login(){
    const onFinish = (values: FormValues) => {
        const {username, password} = values
        axios.post('http://localhost:3001/validatePassword', {username, password})
        .then(res => {
          if(res.data.validation){
            alert('Your password is correct, thank you for your service')
          }
          else{
            alert('Your password is not correct. Please try again.')
          }
        })
        console.log('Received values of form: ', values);
      };
    // Configuration for the Cat component
    const catConfig = {
      leftId: "leftSide",
      handWrapSelector: ".hand-wrap .hand",
      mouthSelector: ".mouth",
    };

    return(
      <div>
        {/* Script animation แมว */}
        <Cat {...catConfig} />
        {/* ทางซ้าย */}
        <div id="leftSide" className="container h-screen w-3/5 left-0 bg-orange-200">
            {/* cat component */}
            <div className="cat mt-5 drop-shadow-lg">
                <div className="cat-head">
                    <div className="cat-ears">
                        <div></div>
                        <div></div>
                    </div>
                    <div className="cat-face">
                        <div className="cat-eyes">
                            <div></div>
                            <div></div>
                        </div>
                        <div className="cat-nose">
                            <div className="mustache">
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                            <div className="mustache">
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                        <span className="mouth hide"></span>
                    </div>
                </div>
                <div className="hand-wrap">
                    <div className="hand">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
        {/* ทางขวา */}
        <div className='border-0 drop-shadow-2xl h-screen w-2/5 bg-white absolute insert-y right-0 flex justify-center items-center'>
            <form className='w-2/3'>
              <h1 className='mb-10 font-light'>Login</h1>
                <input className="border-0 mb-2 w-full bg-white" type="text" placeholder='username'/>
                {/* เส้นใต้ input */}
                <div className="border-b-1 mb-5 border-gray-300"></div>

                <input className="border-0 mb-2 w-full bg-white" type="text" placeholder='password'/>
                {/* เส้นใต้ input */}
                <div className="border-b-1 mb-5 border-gray-300">
                </div>
              </form>
        </div>
        
      </div>
      
    )
  }