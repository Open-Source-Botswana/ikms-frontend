// import { SignIn } from '@clerk/nextjs'

// export default function Page() {
//   return <SignIn forceRedirectUrl={'new-user'} />
// }
"use client"

import React, { useState } from 'react'
import svgPaths from '@/app/utils/svg/svg-tts5hwykkz';
import { useSignIn, useSignUp } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { EmailCodeFactor } from '@clerk/types';
import { useUser, useReverification } from '@clerk/nextjs'
import { IKMSLogo } from '@/app/components/shared/ikms-logo';

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


export default function ClerkCustomSignIn() {

  // const { isLoaded, signIn, setActive } = useSignIn()
  const { signIn, setActive } = useSignIn()
  const { signUp } = useSignUp()
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showEmailCode, setShowEmailCode] = useState(false)
  const [code, setCode] = React.useState('')
  const router = useRouter()

  const [verifying, setVerifying] = useState(false)
  const { isLoaded, isSignedIn, user } = useUser()
  const [error, setError] = useState('')

  const createEmailAddress = useReverification((email: string) =>
    user?.createEmailAddress({ email }),
  )

  const handleEmailCode = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isLoaded) return


    if (signUp) {
      try {
        const signUpAttempt = await signUp.attemptEmailAddressVerification({
          code,
        })

        if (signUpAttempt.status === 'complete') {
          if (setActive) {
            await setActive({
              session: signUpAttempt.createdSessionId,
              navigate: async ({ session }) => {
                if (session?.currentTask) {

                  console.log(session?.currentTask)
                  return
                }

                router.push('/ethnobotany/flora')
              },
            })
          }
        } else {

          console.error('Sign-up attempt not complete:', signUpAttempt)
          console.error('Sign-up attempt status:', signUpAttempt.status)
        }
      } catch (err: any) {

        console.error(JSON.stringify(err, null, 2))
      }
    }

    // Flow for signing in an existing user
    try {
      const signInAttempt = await signIn?.attemptFirstFactor({
        strategy: 'email_code',
        code,
      })
      if (signInAttempt && signInAttempt.status === 'complete') {
        if (setActive) {
          await setActive({
            session: signInAttempt.createdSessionId,
          })
        }

        router.push('/ethonobotany/flora')
      } else if (signInAttempt) {

        console.error('Sign-up attempt not complete:', signInAttempt)
        console.error('Sign-up attempt status:', signInAttempt.status)
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2))
    }
  }


  if (!isLoaded) {
    // Handle loading state
    return null
  }

  // if (!isSignedIn) {

  //   return <p>You must be signed in to access this page</p>
  // }
  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();


  //   console.log('➡️ Form submitted:', { email, password, rememberMe, isSignUp });

  //   if (!isLoaded) return

  //   try {
  //     const signInAttempt = await signIn.create({
  //       identifier: email,
  //       password,
  //     })

  //     if (signInAttempt.status === 'complete') {
  //       await setActive({
  //         session: signInAttempt.createdSessionId,

  //       })
  //       router.push('/ethnobotany/flora')
  //     }
  //     else if (signInAttempt.status === 'needs_second_factor') {

  //       const emailCodeFactor = signInAttempt.supportedSecondFactors?.find(
  //         (factor): factor is EmailCodeFactor => factor.strategy === 'email_code',
  //       )

  //       if (emailCodeFactor) {
  //         await signIn.prepareSecondFactor({
  //           strategy: 'email_code',
  //           emailAddressId: emailCodeFactor.emailAddressId,
  //         })


  //         setShowEmailCode(true)
  //       }
  //     } else {


  //       console.error(JSON.stringify(signInAttempt, null, 2))
  //     }


  //   }
  //   catch (err: any) {
  //     console.error(`❌ ${JSON.stringify(err, null, 2)}`)

  //     if (err.errors[0].code === 'form_idenfier_not_found') {

  //       try {
  //         await signUp?.prepareEmailAddressVerification({
  //           strategy: 'email_code',
  //         })
  //       }
  //       catch (err: any) {
  //         console.error(`❌ ${JSON.stringify(err, null, 2)}`)
  //       }
  //     }

  //   }

  // };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (!signIn) {
        setError('Sign in not available')
        return
      }
      const signInAttempt = await signIn.create({
        identifier: email,
      })

      if (signInAttempt.status === 'complete') {
        if (setActive) {
          await setActive({
            session: signInAttempt.createdSessionId,

          })
        }
        router.push('/ethnobotany/flora')
      }
      else if (signInAttempt.status === 'needs_first_factor') {

        const emailCodeFactor = signInAttempt.supportedFirstFactors?.find(
          (factor): factor is EmailCodeFactor => factor.strategy === 'email_code',
        )

        if (emailCodeFactor) {
          await signIn.prepareFirstFactor({
            strategy: 'email_code',
            emailAddressId: emailCodeFactor.emailAddressId,
          })


          setShowEmailCode(true)
        }
      } else {


        console.error(JSON.stringify(signInAttempt, null, 2))
      }


    }
    catch (err: any) {

      /* FIXME:

      handle  session_exists
       - let the user sign or setAcrtive session to null
       - end session via logout and inactivity timeout?
       - Offer Password Recovery?
       - token management
      */

      if (err.errors[0].code === 'session_exists') {

        router.push("/botanical")
      }
      console.error(`❌ ${JSON.stringify(err, null, 2)}`)
    }

  }

  async function reset(e: React.FormEvent) {
    e.preventDefault()
    setVerifying(false)
  }


  if (verifying) {
    return (
      <div>
        <p>Check your email and visit the link that was sent to you.</p>
        <form onSubmit={reset}>
          <button type="submit">Restart</button>
        </form>
      </div>
    )
  }

  if (showEmailCode) {
    return (
      <>
        <h1>Verify your email</h1>
        <p>A verification code has been sent to your email.</p>
        <form onSubmit={handleEmailCode}>
          <div>
            <label htmlFor="code">Enter verification code</label>
            <input
              onChange={(e) => setCode(e.target.value)}
              id="code"
              name="code"
              type="text"
              inputMode="numeric"
              value={code}
            />
          </div>
          <button type="submit">Verify</button>
        </form>
      </>
    )
  }

  // return (
  //   <div className="bg-[#1a1a1a] min-h-screen w-full flex items-center justify-center">
  //     <div className="max-w-[1820px] w-full h-full min-h-[1080px] relative">

  //       <div className="absolute left-[180px] top-[60px] w-[660px] pb-20">

  //         <div className="absolute h-[666px] w-[685px]">
  //           <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 720 766">
  //             <path d={svgPaths.p930c300} id="Ellipse 38" opacity="0.14" stroke="#F3F3F3" />
  //           </svg>
  //         </div>
  //         <div className="absolute h-[633px] left-0 top-[82px] w-[643px]">
  //           <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 660 733">
  //             <path d={svgPaths.p3d12e000} id="Ellipse 39" opacity="0.14" stroke="#F3F3F3" />
  //           </svg>
  //         </div>
  //         <div className="absolute h-[713px] left-[-15px] top-[21px] w-[689px]">
  //           <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 795 813">
  //             <path d={svgPaths.p2ecc8180} id="Ellipse 40" opacity="0.14" stroke="#F3F3F3" />
  //           </svg>
  //         </div>


  //         <div className="absolute left-[180px] top-[180px]">
  //           <IKMSLogo />
  //         </div>
  //       </div>

  //       <p className="absolute font-['Poppins:Bold',sans-serif] h-[120px] leading-[36px] left-[228px] not-italic opacity-80 text-[26px] text-white top-[714px] w-[641px] whitespace-pre-wrap">
  //         A gateway to the expertise of community networks, practitioners and policymakers
  //       </p>

  //       <div className="absolute left-[228px] top-[860px]">
  //         <div className="h-[6px] w-[100px]">
  //           <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 100 6">
  //             <line stroke="#DFA100" strokeLinecap="round" strokeWidth="6" x1="3" x2="97" y1="3" y2="3" />
  //           </svg>
  //         </div>
  //       </div>


  //       <div className="absolute left-[1162px] top-[200px] w-[441px]">
  //         <p className="font-['Roboto:Regular',sans-serif] font-normal text-[16px] text-white w-full whitespace-pre-wrap mb-[57px]" style={{ fontVariationSettings: "'wdth' 100" }}>
  //           Welcome to Botswana's Indigenous Knowledge Community please log in or create an account.
  //         </p>


  //         <h1 className="font-['Roboto:Bold',sans-serif] font-bold text-[#344767] text-[22px] text-center mb-[22px]" style={{ fontVariationSettings: "'wdth' 100" }}>
  //           {isSignUp ? 'Sign Up' : 'Sign In'}
  //         </h1>


  //         <p className="font-['Roboto:Regular',sans-serif] font-normal text-[#7b809a] text-[16px] text-center mb-[80px]" style={{ fontVariationSettings: "'wdth' 100" }}>
  //           {isSignUp ? 'Enter your details to create an account' : 'Enter your email and password to Sign In'}
  //         </p>

  //         <form onSubmit={handleSubmit} className="w-[361px] mx-auto">

  //           <div className="mb-[14px]">
  //             <div className="relative h-[42px] w-full bg-white border border-[#c7ccd0] border-solid rounded-[8px]">
  //               <input
  //                 id="email"
  //                 type="email"
  //                 value={email}
  //                 onChange={(e) => setEmail(e.target.value)}
  //                 placeholder="Email"
  //                 className="absolute inset-0 px-[16px] font-['Roboto:Regular',sans-serif] font-normal text-[14px] text-[#7b809a] bg-transparent border-none outline-none rounded-[8px]"
  //                 style={{ fontVariationSettings: "'wdth' 100" }}
  //                 required
  //               />
  //             </div>
  //           </div>


  //           {!isSignUp && (
  //             <div className="flex items-center gap-[6px] mb-[62px]">
  //               <button
  //                 type="button"
  //                 onClick={() => setRememberMe(!rememberMe)}
  //                 className="relative h-[20px] w-[34px] rounded-[7.5px] transition-colors"
  //                 style={{ backgroundColor: rememberMe ? '#678415' : '#c7ccd0' }}
  //               >
  //                 <div
  //                   className="absolute top-1/2 -translate-y-1/2 w-[20px] h-[20px] bg-white rounded-full border border-[#c7ccd0] shadow-[0_2px_6px_rgba(0,0,0,0.25)] transition-all"
  //                   style={{ left: rememberMe ? 'calc(100% - 20px)' : '0' }}
  //                 />
  //               </button>
  //               <p className="font-['Roboto:Regular',sans-serif] font-normal text-[#7b809a] text-[14px]" style={{ fontVariationSettings: "'wdth' 100" }}>
  //                 Remember me
  //               </p>
  //             </div>
  //           )}


  //           <button
  //             type="submit"
  //             className="h-[40px] w-full bg-[#678415] rounded-[8px] hover:bg-[#567013] transition-colors mb-[31px]"
  //           >
  //             <p className="font-['Roboto:Bold',sans-serif] font-bold text-[12px] text-center text-white uppercase" style={{ fontVariationSettings: "'wdth' 100" }}>
  //               {isSignUp ? 'SIGN UP' : 'CONTINUE'}
  //             </p>
  //           </button>


  //           <p className="font-['Roboto:Regular',sans-serif] font-normal text-[#7b809a] text-[14px] text-center" style={{ fontVariationSettings: "'wdth' 100" }}>
  //             {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
  //             <button
  //               type="button"
  //               onClick={() => setIsSignUp(!isSignUp)}
  //               className="font-['Roboto:Bold',sans-serif] font-bold text-[#e89c2d] hover:underline"
  //               style={{ fontVariationSettings: "'wdth' 100" }}
  //             >
  //               {isSignUp ? 'Sign In' : 'Sign Up'}
  //             </button>
  //           </p>
  //         </form>
  //       </div>


  //       <div className="absolute left-[1276px] top-[779px] flex flex-col items-center gap-[11px]">
  //         <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold text-[18px] text-center text-white">
  //           Developed by:
  //         </p>
  //         <div className="h-[6px] w-[60px]">
  //           <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 60 6">
  //             <line stroke="#DFA100" strokeLinecap="round" strokeWidth="6" x1="3" x2="57" y1="3" y2="3" />
  //           </svg>
  //         </div>
  //       </div>

  //       <div className="absolute left-[1447px] top-[779px]">
  //         <h1 className="font-['Roboto:Bold',sans-serif] font-bold text-[#344767] text-[22px] text-center mb-[22px]" style={{ fontVariationSettings: "'wdth' 100" }}>
  //           <a href="https://github.com/Open-Source-Botswana"> OpenSourceBotswana</a>
  //         </h1>

  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <div className="bg-[#1a1a1a] h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="max-w-[1400px] w-full h-full flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-12 px-4 sm:px-6 lg:px-8 py-4">

        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start">
          <div className="relative w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[450px] mb-4 lg:mb-6">

            <div className="relative aspect-[685/666] w-full mx-auto mt-26">
              <svg className="absolute inset-0 w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 685 666">
                <path d={svgPaths.p930c300} id="Ellipse 38" opacity="0.14" stroke="#F3F3F3" />
              </svg>
              <svg className="absolute inset-[6%_3%_0%_0%] w-[94%] h-[95%]" fill="none" preserveAspectRatio="none" viewBox="0 0 643 633">
                <path d={svgPaths.p3d12e000} id="Ellipse 39" opacity="0.14" stroke="#F3F3F3" />
              </svg>
              <svg className="absolute inset-[3%_0%_0%_-2%] w-[101%] h-[107%]" fill="none" preserveAspectRatio="none" viewBox="0 0 689 713">
                <path d={svgPaths.p2ecc8180} id="Ellipse 40" opacity="0.14" stroke="#F3F3F3" />
              </svg>

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-[0.6] sm:scale-75 lg:scale-90">
                <IKMSLogo />
              </div>
            </div>
          </div>

          <div className="w-full max-w-[450px] text-center lg:text-left pt-10">
            <p className="font-['Poppins:Bold',sans-serif] leading-[1.3] opacity-80 text-base sm:text-lg lg:text-xl text-white mb-3 lg:mb-4">
              A gateway to the expertise of community networks, practitioners and policymakers
            </p>


            <div className="h-[4px] w-[80px] mx-auto lg:mx-0">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 100 6">
                <line stroke="#DFA100" strokeLinecap="round" strokeWidth="6" x1="3" x2="97" y1="3" y2="3" />
              </svg>
            </div>
          </div>
        </div>


        <div className="w-full lg:w-1/2 max-w-[440px] mt-28">

          <p className="font-['Roboto:Regular',sans-serif] font-normal text-xs sm:text-sm text-white text-center lg:text-left mb-4 lg:mb-6" style={{ fontVariationSettings: "'wdth' 100" }}>
            Welcome to Botswana's Indigenous Knowledge Community please log in or create an account.
          </p>


          <h1 className="font-['Roboto:Bold',sans-serif] font-bold text-[#344767] text-lg sm:text-xl text-center mb-2 lg:mb-3" style={{ fontVariationSettings: "'wdth' 100" }}>
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </h1>

          <p className="font-['Roboto:Regular',sans-serif] font-normal text-[#7b809a] text-xs sm:text-sm text-center mb-4 lg:mb-6" style={{ fontVariationSettings: "'wdth' 100" }}>
            {isSignUp ? 'Enter your details to create an account' : 'Enter your email and password to Sign In'}
          </p>

          <form onSubmit={handleSubmit} className="w-full max-w-[361px] mx-auto">

            <div className="mb-3">
              <div className="relative h-[40px] w-full bg-white border border-[#c7ccd0] border-solid rounded-[8px]">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="absolute inset-0 px-[16px] font-['Roboto:Regular',sans-serif] font-normal text-sm text-[#7b809a] bg-transparent border-none outline-none rounded-[8px]"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                  required
                />
              </div>
            </div>
            {/*
            <div className="mb-3">
              <div className="relative h-[40px] w-full bg-white border border-[#c7ccd0] border-solid rounded-[8px]">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Current password"
                  className="absolute inset-0 px-[16px] font-['Roboto:Regular',sans-serif] font-normal text-sm text-[#7b809a] bg-transparent border-none outline-none rounded-[8px]"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                  required
                />
              </div>
            </div> */}

            {!isSignUp && (
              <div className="flex items-center gap-[6px] mb-4 lg:mb-6">
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
                <p className="font-['Roboto:Regular',sans-serif] font-normal text-[#7b809a] text-sm" style={{ fontVariationSettings: "'wdth' 100" }}>
                  Remember me
                </p>
              </div>
            )}

            {isSignUp && <div className="mb-4 lg:mb-6" />}

            <button
              type="submit"
              className="h-[40px] w-full bg-[#678415] rounded-[8px] hover:bg-[#567013] transition-colors mb-4"
            >
              <p className="font-['Roboto:Bold',sans-serif] font-bold text-xs text-center text-white uppercase" style={{ fontVariationSettings: "'wdth' 100" }}>
                {isSignUp ? 'SIGN UP' : 'SIGN IN'}
              </p>
            </button>


            <p className="font-['Roboto:Regular',sans-serif] font-normal text-[#7b809a] text-sm text-center" style={{ fontVariationSettings: "'wdth' 100" }}>
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

        <div className=" left-[1276px] mt-10 flex flex-col items-center gap-[11px] mb-4">
          <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold text-[18px] text-center text-white">
            Developed by:
          </p>
          <div className="h-[6px] w-[60px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 60 6">
              <line stroke="#DFA100" strokeLinecap="round" strokeWidth="6" x1="3" x2="57" y1="3" y2="3" />
            </svg>
          </div>
        </div>

        <div className=" left-[1147px] ">
          <h1 className="font-['Roboto:Bold',sans-serif] font-bold text-[#344767] text-[22px] text-center mb-[22px]" style={{ fontVariationSettings: "'wdth' 100" }}>
            <a href="https://github.com/Open-Source-Botswana"> OpenSourceBotswana</a>
          </h1>

        </div>

        </div>
      </div>


      {showEmailCode && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-[12px] shadow-2xl w-full max-w-[440px] p-6 sm:p-8">
            <h1 className="font-['Roboto:Bold',sans-serif] font-bold text-[#344767] text-xl sm:text-[22px] text-center mb-4" style={{ fontVariationSettings: "'wdth' 100" }}>
              Verify your email
            </h1>

            <p className="font-['Roboto:Regular',sans-serif] font-normal text-[#7b809a] text-sm sm:text-base text-center mb-8" style={{ fontVariationSettings: "'wdth' 100" }}>
              A verification code has been sent to your email.
            </p>

            <form onSubmit={handleEmailCode} className="w-full">
              <div className="mb-6">
                <label
                  htmlFor="code"
                  className="block font-['Roboto:Regular',sans-serif] font-normal text-[#344767] text-sm mb-2"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  Enter verification code
                </label>
                <div className="relative h-[42px] w-full bg-white border border-[#c7ccd0] border-solid rounded-[8px]">
                  <input
                    onChange={(e) => setCode(e.target.value)}
                    id="code"
                    name="code"
                    type="text"
                    inputMode="numeric"
                    value={code}
                    className="absolute inset-0 px-[16px] font-['Roboto:Regular',sans-serif] font-normal text-sm text-[#7b809a] bg-transparent border-none outline-none rounded-[8px]"
                    style={{ fontVariationSettings: "'wdth' 100" }}
                    placeholder="000000"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowEmailCode(false);
                    setCode('');
                  }}
                  className="h-[40px] flex-1 bg-[#c7ccd0] rounded-[8px] hover:bg-[#b0b5b9] transition-colors"
                >
                  <p className="font-['Roboto:Bold',sans-serif] font-bold text-xs text-center text-white uppercase" style={{ fontVariationSettings: "'wdth' 100" }}>
                    CANCEL
                  </p>
                </button>
                <button
                  type="submit"
                  className="h-[40px] flex-1 bg-[#678415] rounded-[8px] hover:bg-[#567013] transition-colors"
                >
                  <p className="font-['Roboto:Bold',sans-serif] font-bold text-xs text-center text-white uppercase" style={{ fontVariationSettings: "'wdth' 100" }}>
                    VERIFY
                  </p>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  );
}
