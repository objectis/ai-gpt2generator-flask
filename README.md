## GPT-2 based text generator (web interface part)

Text generator based on GPT-2. Text generator consists of 2 parts: 
- Web interface used to modify generator settings (this repository)
- API hosted on Google Cloud Run that does runs GPT-2 and generates text. (another repository)

This is web interface part of the system. API can be found here:
https://github.com/objectis/ai-gpt2generator-api

### How it works
After signing up, user gets free access to text generator. Free version is limited to non-configurable generator options and limited text size. After getting paid version, user can set up all the configurable options. 

### Technologies used
This system uses Python + Flask to show UI, collect payments and store user and payment information. 

### See it in action
System can be tested here: https://machinelearning-final.herokuapp.com/
