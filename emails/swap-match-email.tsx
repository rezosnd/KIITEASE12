import { Body, Container, Head, Heading, Html, Img, Link, Preview, Section, Text } from "@react-email/components"

interface SwapMatchEmailProps {
  name: string
  currentSection: string
  targetSection: string
  matchedWithName: string
  matchedWithPhone?: string // Optional phone number
  expiresAt: Date
}

export default function SwapMatchEmail({
  name,
  currentSection,
  targetSection,
  matchedWithName,
  matchedWithPhone,
  expiresAt,
}: SwapMatchEmailProps) {
  const formattedDate = new Date(expiresAt).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZoneName: "short",
  })

  const main = {
    backgroundColor: "#ffffff",
  }

  const container = {
    margin: "0 auto",
    padding: "20px 0 48px",
    width: "600px",
  }

  const logo = {
    margin: "0 auto",
  }

  const heading = {
    fontSize: "32px",
    lineHeight: "1.3",
    fontWeight: "700",
    color: "#484848",
    padding: "0px 0px 10px",
  }

  const section = {
    padding: "0 0 24px",
  }

  const text = {
    color: "#484848",
    fontSize: "14px",
    lineHeight: "1.5",
  }

  const matchBox = {
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  }

  const matchHeading = {
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "5px",
  }

  const matchItem = {
    fontSize: "14px",
    marginBottom: "3px",
  }

  const matchLabel = {
    fontWeight: "bold",
  }

  const highlight = {
    fontWeight: "bold",
    color: "#007bff",
  }

  const buttonContainer = {
    textAlign: "center",
    margin: "20px 0",
  }

  const button = {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "12px 24px",
    borderRadius: "5px",
    textDecoration: "none",
    display: "inline-block",
    fontSize: "16px",
    fontWeight: "bold",
  }

  const footer = {
    fontSize: "12px",
    color: "#999",
    marginTop: "20px",
    textAlign: "center",
  }

  return (
    <Html>
      <Head />
      <Preview>Section Swap Match Found! Action Required</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img src="https://kiitease.vercel.app/logo.png" width="120" height="40" alt="KIITease" style={logo} />
          <Heading style={heading}>Section Swap Match Found!</Heading>
          <Section style={section}>
            <Text style={text}>Hi {name},</Text>
            <Text style={text}>
              Great news! We've found a match for your section swap request. Here are the details:
            </Text>
            <Section style={matchBox}>
              <Text style={matchHeading}>Swap Details</Text>
              <Text style={matchItem}>
                <span style={matchLabel}>Your Current Section:</span> {currentSection}
              </Text>
              <Text style={matchItem}>
                <span style={matchLabel}>Your Target Section:</span> {targetSection}
              </Text>
              <Text style={matchItem}>
                <span style={matchLabel}>Matched With:</span> {matchedWithName}
              </Text>
              {matchedWithPhone && (
                <Text style={matchItem}>
                  <span style={matchLabel}>Contact Number:</span> {matchedWithPhone}
                </Text>
              )}
              <Text style={matchItem}>
                <span style={matchLabel}>Expires At:</span> {formattedDate}
              </Text>
            </Section>
            <Text style={text}>
              <span style={highlight}>Action Required:</span> Please log in to your KIITease account and accept this
              match before it expires. If you don't accept within the time limit, the match will be cancelled and your
              request will return to the pending state.
            </Text>
            {matchedWithPhone ? (
              <Text style={text}>
                You can contact your match directly using the phone number provided above to coordinate the swap.
              </Text>
            ) : (
              <Text style={text}>
                Your match hasn't provided a phone number. You can communicate through the platform after accepting the
                match.
              </Text>
            )}
          </Section>
          <Section style={buttonContainer}>
            <Link style={button} href="https://kiitease.vercel.app/section-swap">
              View & Accept Match
            </Link>
          </Section>
          <Text style={text}>If you have any questions or need assistance, feel free to contact our support team.</Text>
          <Text style={text}>
            Best regards,
            <br />
            The KIITease Team
          </Text>
          <Text style={footer}>
            © {new Date().getFullYear()} KIITease. All rights reserved.
            <br />
            KIIT University, Bhubaneswar, Odisha, India
          </Text>
        </Container>
      </Body>
    </Html>
  )
}
