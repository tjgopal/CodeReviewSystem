import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
  try {
    const { code, question } = await request.json();

    const prompt = `You are an experienced code review assistant. Review the following code thoroughly based on the provided question. Follow the structured guidelines below to ensure a comprehensive and helpful review:

    Code:
    ${code}

    Question:
    ${question}

    Provide feedback in the following format:

    1. **Question Understanding and Purpose**:
      - Briefly restate the question to confirm understanding.
      - Does the code address the question's requirements and constraints?
    
    2. ** Language Used **:
      - Specifiy which language is used here for the code 
      - Highlight if any error are present in the code 

    3. **Functionality Check**:
      - Verify if the code produces the correct output for a range of test cases, including edge cases.
      - Identify any input validation or error-handling considerations.


    4. **Efficiency & Performance**:
      - Evaluate time and space complexity, suggesting optimizations if possible.
      - Mention if loops, recursive calls, or data structures could be optimized or simplified.

    5. **Code Quality & Best Practices**:
      - Check if the code follows best practices for its language, such as naming conventions and indentation.
      - Are variable names, functions, and classes well-named and clear in their purpose?
      - Assess modularity and whether functions/classes could improve reusability.

    6. **Readability & Documentation**:
      - Evaluate if the code logic is easy to follow. Suggest ways to improve readability if needed.
      - Check for comments where necessary, providing clarity on complex sections.

    7. **Suggested Improvements**:
      - Offer actionable suggestions to improve the code’s readability, efficiency, or modularity.
      - Recommend alternative approaches or tests to cover overlooked edge cases if any.
    
    8.**Test Cases and Corrections**:
      - If the code is correct, provide test cases to verify the code's functionality.
      - If the code is incorrect, provide the corrected code along with explanations.


    Provide a well-rounded response, ensuring your feedback is constructive, specific, and clear.`;

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a code review assistant." },
          { role: "user", content: prompt },
        ],
        max_tokens: 500,
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const result = response.data.choices[0].message;

    return NextResponse.json({ result });
  } catch (error) {
    console.error("Error in API route:", error);

    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const { status, data } = error.response;
      console.error("OpenAI API Error Response:", data);

      return NextResponse.json(
        { error: data.error.message || "OpenAI API Error" },
        { status: status }
      );
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received from OpenAI API:", error.request);

      return NextResponse.json(
        { error: "No response received from OpenAI API" },
        { status: 500 }
      );
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error setting up request to OpenAI API:", error.message);

      return NextResponse.json(
        { error: error.message || "Something went wrong" },
        { status: 500 }
      );
    }
  }
}

// export async function GET(request: Request) {
//   return NextResponse.json({ message: "hello world" });
// }
// change the prompt  to correct strucuture
