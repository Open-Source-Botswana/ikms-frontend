// import { SignIn } from '@clerk/nextjs'

// export default function Page() {
//   return <SignIn forceRedirectUrl={'new-user'} />
// }
"use client"

import React, { useState } from 'react'
import svgPaths from '@/app/utils/svg/svg-tts5hwykkz';


function BxBxlFacebook() {
  return (
    <div className="size-[30px]" data-name="bx:bxl-facebook">
      <svg className="block size-full cursor-pointer hover:opacity-80 transition-opacity" fill="none" preserveAspectRatio="none" viewBox="0 0 30 30">
        <g id="bx:bxl-facebook">
          <path d={svgPaths.p2ab4e180} fill="white" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function BxBxlInstagram() {
  return (
    <div className="size-[30px]" data-name="bx:bxl-instagram">
      <svg className="block size-full cursor-pointer hover:opacity-80 transition-opacity" fill="none" preserveAspectRatio="none" viewBox="0 0 30 30">
        <g id="bx:bxl-instagram">
          <path d={svgPaths.p399a7700} fill="white" id="Vector" />
          <path d={svgPaths.p16d33800} fill="white" id="Vector_2" />
          <path d={svgPaths.p29ceed80} fill="white" id="Vector_3" />
        </g>
      </svg>
    </div>
  );
}

function BiTwitter() {
  return (
    <div className="overflow-clip size-[30px]" data-name="bi:twitter">
      <div className="absolute inset-[12.5%_0_6.25%_0]">
        <svg className="block size-full cursor-pointer hover:opacity-80 transition-opacity" fill="none" preserveAspectRatio="none" viewBox="0 0 30 24.3763">
          <g id="Group">
            <path d={svgPaths.p10b48e00} fill="white" id="Vector" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function FeatherMail() {
  return (
    <div className="overflow-clip size-[30px]" data-name="feather:mail">
      <div className="absolute inset-[16.67%_8.33%]">
        <div className="absolute inset-[-5%_-4%]">
          <svg className="block size-full cursor-pointer hover:opacity-80 transition-opacity" fill="none" preserveAspectRatio="none" viewBox="0 0 27.0002 22">
            <g id="Group">
              <path d={svgPaths.pc015080} id="Vector" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              <path d={svgPaths.pce552a0} id="Vector_2" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

function SocialIcons() {
  return (
    <div className="flex gap-[25px] items-center">
      <BxBxlFacebook />
      <BxBxlInstagram />
      <BiTwitter />
      <FeatherMail />
    </div>
  );
}

function IKMSLogo() {
  return (
    <div className="relative w-[241px] h-[276px]">
      <div className="absolute bg-[#f3f3f3] border border-solid border-white h-[127.496px] left-0 rounded-[5px] top-0 w-[114.499px]" />
      <div className="absolute bg-[#f3f3f3] border border-solid border-white h-[127.496px] left-0 rounded-[5px] top-[148.65px] w-[114.499px]" />
      <div className="absolute flex flex-col font-['Sen:Bold',sans-serif] font-bold h-[70.151px] justify-center leading-[0] left-[23px] text-[#434956] text-[88px] top-[207.11px] tracking-[-1.32px] w-[67.999px] -translate-y-1/2">
        <p className="leading-[1.054] whitespace-pre-wrap">M</p>
      </div>
      <div className="absolute bg-[#f3f3f3] border border-solid border-white h-[127.496px] left-[126.5px] rounded-[5px] top-0 w-[114.499px]" />
      <div className="absolute bg-[#f3f3f3] border border-solid border-white h-[127.496px] left-[126.5px] rounded-[5px] top-[148.65px] w-[114.499px]" />
      <div className="absolute flex flex-col font-['Sen:Bold',sans-serif] font-bold h-[72.378px] justify-center leading-[0] left-[155.5px] text-[#434956] text-[88px] top-[212.12px] tracking-[-1.32px] w-[51px] -translate-y-1/2 text-center">
        <p className="leading-[1.054] whitespace-pre-wrap">S</p>
      </div>
      <div className="absolute flex flex-col font-['Sen:Bold',sans-serif] font-bold h-[46.21px] justify-center leading-[0] left-[32px] text-[#434956] text-[88px] top-[63.75px] tracking-[-1.32px] w-[45px] -translate-y-1/2 text-center">
        <p className="leading-[1.054] whitespace-pre-wrap">I</p>
      </div>
      <div className="absolute flex flex-col font-['Sen:Bold',sans-serif] font-bold h-[56.789px] justify-center leading-[0] left-[158px] text-[#434956] text-[88px] top-[65.69px] tracking-[-1.32px] w-[51.5px] -translate-y-1/2">
        <p className="leading-[1.054] whitespace-pre-wrap">K</p>
      </div>
      <div className="absolute bg-[#b6ef11] h-[3px] left-[6px] rounded-[2px] top-[305px] w-[244px]" />
    </div>
  );
}
export default function ClerkCustomSignIn() {


    const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
    const handleSubmit =  (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', { email, password, rememberMe, isSignUp });

  };

  return (
    <div className="bg-[#1a1a1a] min-h-screen w-full flex items-center justify-center">
      <div className="max-w-[1820px] w-full h-full min-h-[1080px] relative">

        <div className="absolute left-[180px] top-[60px] w-[660px] pb-20">
          {/* Concentric circles */}
          <div className="absolute h-[666px] w-[685px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 720 766">
              <path d={svgPaths.p930c300} id="Ellipse 38" opacity="0.14" stroke="#F3F3F3" />
            </svg>
          </div>
          <div className="absolute h-[633px] left-0 top-[82px] w-[643px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 660 733">
              <path d={svgPaths.p3d12e000} id="Ellipse 39" opacity="0.14" stroke="#F3F3F3" />
            </svg>
          </div>
          <div className="absolute h-[713px] left-[-15px] top-[21px] w-[689px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 795 813">
              <path d={svgPaths.p2ecc8180} id="Ellipse 40" opacity="0.14" stroke="#F3F3F3" />
            </svg>
          </div>

          {/* IKMS Logo */}
          <div className="absolute left-[180px] top-[180px]">
            <IKMSLogo />
          </div>
        </div>

        <p className="absolute font-['Poppins:Bold',sans-serif] h-[120px] leading-[36px] left-[228px] not-italic opacity-80 text-[26px] text-white top-[714px] w-[641px] whitespace-pre-wrap">
          A gateway to the expertise of community networks, practitioners and policymakers
        </p>

        <div className="absolute left-[228px] top-[860px]">
          <div className="h-[6px] w-[100px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 100 6">
              <line stroke="#DFA100" strokeLinecap="round" strokeWidth="6" x1="3" x2="97" y1="3" y2="3" />
            </svg>
          </div>
        </div>


        <div className="absolute left-[1162px] top-[200px] w-[441px]">
          <p className="font-['Roboto:Regular',sans-serif] font-normal text-[16px] text-white w-full whitespace-pre-wrap mb-[57px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            Welcome to Botswana's Indigenous Knowledge Community please log in or create an account.
          </p>


          <h1 className="font-['Roboto:Bold',sans-serif] font-bold text-[#344767] text-[22px] text-center mb-[22px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </h1>


          <p className="font-['Roboto:Regular',sans-serif] font-normal text-[#7b809a] text-[16px] text-center mb-[80px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            {isSignUp ? 'Enter your details to create an account' : 'Enter your email and password to Sign In'}
          </p>

          <form onSubmit={handleSubmit} className="w-[361px] mx-auto">

            <div className="mb-[14px]">
              <div className="relative h-[42px] w-full bg-white border border-[#c7ccd0] border-solid rounded-[8px]">
                <input
                id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="absolute inset-0 px-[16px] font-['Roboto:Regular',sans-serif] font-normal text-[14px] text-[#7b809a] bg-transparent border-none outline-none rounded-[8px]"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                  required
                />
              </div>
            </div>

            <div className="mb-[16px]">
              <div className="relative h-[42px] w-full bg-white border border-[#c7ccd0] border-solid rounded-[8px]">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="absolute inset-0 px-[16px] font-['Roboto:Regular',sans-serif] font-normal text-[14px] text-[#7b809a] bg-transparent border-none outline-none rounded-[8px]"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                  required
                />
              </div>
            </div>

            {!isSignUp && (
              <div className="flex items-center gap-[6px] mb-[62px]">
                <button
                  type="button"
                  onClick={() => setRememberMe(!rememberMe)}
                  className="relative h-[20px] w-[34px] rounded-[7.5px] transition-colors"
                  style={{ backgroundColor: rememberMe ? '#678415' : '#c7ccd0' }}
                >
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-[20px] h-[20px] bg-white rounded-full border border-[#c7ccd0] shadow-[0_2px_6px_rgba(0,0,0,0.25)] transition-all"
                    style={{ left: rememberMe ? 'calc(100% - 20px)' : '0' }}
                  />
                </button>
                <p className="font-['Roboto:Regular',sans-serif] font-normal text-[#7b809a] text-[14px]" style={{ fontVariationSettings: "'wdth' 100" }}>
                  Remember me
                </p>
              </div>
            )}


            <button
              type="submit"
              className="h-[40px] w-full bg-[#678415] rounded-[8px] hover:bg-[#567013] transition-colors mb-[31px]"
            >
              <p className="font-['Roboto:Bold',sans-serif] font-bold text-[12px] text-center text-white uppercase" style={{ fontVariationSettings: "'wdth' 100" }}>
                {isSignUp ? 'SIGN UP' : 'SIGN IN'}
              </p>
            </button>


            <p className="font-['Roboto:Regular',sans-serif] font-normal text-[#7b809a] text-[14px] text-center" style={{ fontVariationSettings: "'wdth' 100" }}>
              {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="font-['Roboto:Bold',sans-serif] font-bold text-[#e89c2d] hover:underline"
                style={{ fontVariationSettings: "'wdth' 100" }}
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </form>
        </div>


        <div className="absolute left-[1276px] top-[779px] flex flex-col items-center gap-[11px]">
          <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold text-[18px] text-center text-white">
            Developed by:
          </p>
          <div className="h-[6px] w-[60px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 60 6">
              <line stroke="#DFA100" strokeLinecap="round" strokeWidth="6" x1="3" x2="57" y1="3" y2="3" />
            </svg>
          </div>
        </div>

        <div className="absolute left-[1447px] top-[779px]">
          <h1 className="font-['Roboto:Bold',sans-serif] font-bold text-[#344767] text-[22px] text-center mb-[22px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            <a href="https://github.com/Open-Source-Botswana"> OpenSourceBotswana</a>
          </h1>

          {/* <SocialIcons /> */}
        </div>
      </div>
    </div>
  );
}
