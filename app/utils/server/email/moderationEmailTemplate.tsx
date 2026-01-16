import { ModerationAction } from '@/lib/types/comments';
import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface RiddleReplyEmailProps {

  recipient_email: string;
  comment_id: string;
  action: ModerationAction;
  reason: string;
  moderator_name: string;
  nextSteps?: { id: number; text: string }[];
  supportLinks?: { title: string; href: string }[];
}

export const CommentsModerationEmail = ({
  recipient_email,
  comment_id,
  action,
  reason,
  moderator_name,
  nextSteps = [],
  supportLinks = [],
}: RiddleReplyEmailProps) => {
  return (
    <Html>
      <Head />
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                brand: '#2250f4',
                offwhite: '#fafbfb',
              },
            },
          },
        }}
      >
        <Preview>IKMS Support Feedback</Preview>

        <Body className="bg-offwhite font-sans text-base">
          <Container className="bg-white p-8 mt-10 rounded-md shadow-sm max-w-xl mx-auto">
            <Section className="py-[22px] px-10 bg-[#4b8aff]">

            <Heading className="text-center text-2xl font-bold mb-4 leading-3">
              Support Feedback
            </Heading>
          </Section>

            <Text className="text-gray-700">
              User @ <strong>{recipient_email}</strong>,
            </Text>

            <Text className="text-gray-700">
              Reference ID: <strong>{comment_id}</strong>,
            </Text>


            <Text className="text-gray-700 mb-6">Support Feedback: {action}</Text>


            <Text className="text-gray-700 mb-6">Moderator: {moderator_name}</Text>

            <Section className="bg-[rgb(245,244,245)] rounded mb-[30px] py-10 px-[10px]">
              <Text className="text-xl leading-[24px] text-center align-middle">
                {reason || 'No additional comments provided.'}
              </Text>
            </Section>

            {nextSteps.length > 0 && (
              <Section className="my-6">
                <Heading className="text-lg font-medium mb-2">
                  What to expect:
                </Heading>
                <ul className="list-disc pl-5 text-gray-700">
                  {nextSteps.map(item => (
                    <li key={item.id} className="mb-2">
                      {item.text}
                    </li>
                  ))}
                </ul>
              </Section>
            )}

            <Section className="text-center my-8">
              <Button
                className="bg-[#2138c6] text-white border-0 text-[15px] leading-[18px] cursor-pointer rounded p-3"
                href="http://34.226.203.226:3000/"
              >
                <strong>Visit Our Site</strong>
              </Button>
            </Section>

            {supportLinks.length > 0 && (
              <Section className="mt-10">
                <Row className="flex justify-center gap-6">
                  {supportLinks.map(link => (
                    <Column key={link.title}>
                      <Link
                        href={link.href}
                        className="text-black font-semibold underline mr-6"
                      >
                        {link.title}
                      </Link>
                    </Column>
                  ))}
                </Row>
              </Section>
            )}
          </Container>

          <Container className="mt-8 text-center text-gray-400">
            <Section className="text-sm">
              <Link href="#" className="mr-3">
                Unsubscribe
              </Link>
              <Link href="#">Manage Preferences</Link>
            </Section>
            <Text className="text-xs mt-4">
              IKMS Project • Botswana • Empowering Indigenous Knowledge
            </Text>
            <Text className="text-md mt-4">• Open Source Botswana •</Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default CommentsModerationEmail;
