from openai import OpenAI
from dotenv import load_dotenv
import os
import PyPDF2

# Load environment variables
load_dotenv()

with open('test.pdf', 'rb') as pdf_file:
    pdf_reader = PyPDF2.PdfReader(pdf_file)

    # grabs the API key from the environment file
    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

    for page_num in range(len(pdf_reader.pages)):
        # indexing 0 means the first page, so 1 would be the second page, etc.
        page_text = pdf_reader.pages[page_num].extract_text()

        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system",  # what you want the AI to be aware of/take the role of
                    "content": "You are a master at making flashcards. Instead of just copying the text, try to understand the content and generate a set of flashcards that will help someone else learn the material."
                },
                {
                    "role": "user",  # what you want the AI to actually do
                    "content": f"Generate a set of educational flashcards (at least make 5 flashcards) based on the following content. Each flashcard should follow the format 'Q: [Question] A: [Answer]' and focus on clear, concise explanations. Ensure the questions test understanding rather than just recall. Make as many flashcards as you see fit to ensure a solid grasp of the topics. Content: {page_text}"
                }
            ]
        )
        # The index 0 accesses the first choice of generated responses.
        page_summary = response.choices[0].message.content
        

    print(page_summary)
