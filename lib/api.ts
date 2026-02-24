// import { SubmissionFormData } from "@/app/utils/schemas/formSchemas/submissoinFormSchema"

type OnboardingInput = {
  researchPurpose?: string
  organization?: string
  interests?: string[]
  termsAccepted?: boolean
}

export const createNewOnboarding = async (data?: OnboardingInput) => {
  const createURL = (path: string) => window.location.origin + path
  console.log('>>>>>>>>>>>>Entry: API>>>>>>>>>>>>>>>>>>')
  console.log('>>>>>>>>>>>>>>ENTRY DATA:>>>>>>>>>>', data)
  const res = await fetch(
    new Request(createURL('/api/onboarding'), {
      method: 'POST',
      body: JSON.stringify(data),
    })
  )

  if (res.ok) {
    const data = await res.json()
    return data.data
  } else {
    throw new Error('Something went wrong on API server!')
  }
}

export const createNewSubmit = async (data?: BodyInit) => {
  const createURL = (path: string) => window.location.origin + path
  const res = await fetch(
    new Request(createURL('/api/submit'), {
      method: 'POST',
      body: data,
    })
  )

  if (res.ok) {
    const data = await res.json()
    return data.data
  } else {
    throw new Error('Something went wrong on API server!')
  }
}

export const createNewBotanicalSubmit = async (data?: BodyInit) => {
  const createURL = (path: string) => window.location.origin + path
  const res = await fetch(
    new Request(createURL('/api/botanical/paperless'), {
      method: 'POST',
      body: data,
    })
  )

  if (res.ok) {
    const data = await res.json()
    return data.data
  } else {
    throw new Error('Something went wrong on API server!')
  }
}
