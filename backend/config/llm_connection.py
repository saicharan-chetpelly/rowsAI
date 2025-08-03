import os

import openai
from dotenv import load_dotenv

load_dotenv()

client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


def chat_with_openai(prompt, model=os.getenv("OPEN_AI_MODEL"), temperature=1):
    messages = [{"role": "user", "content": prompt}]
    model_response = client.chat.completions.create(
        model=model,
        messages=messages,
        temperature=temperature
    )

    return model_response.choices[0].message.content
