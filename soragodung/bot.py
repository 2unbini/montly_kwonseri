# bot.py

from chatterbot import ChatBot
import nltk

chatbot = ChatBot("Soragodung")
nltk.download('punkt_tab')

exit_conditions = (":q", "quit", "exit")
while True:
    query = input("> ")
    if query in exit_conditions:
        break
    else:
        print(f"🐚 {chatbot.get_response(query)}")
