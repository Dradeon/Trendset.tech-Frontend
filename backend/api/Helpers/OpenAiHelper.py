import openai
class OpenAiHelper:
    def __init__(self):
        self.ai = openai
        pass
    def createBio(self,name,desc):   
        self.ai.api_key = "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"      
        completion = self.ai.ChatCompletion.create(model="gpt-3.5-turbo", messages=[
            {
                "role": "user",
                "content": "Write a tagline for a business named "+name+" for this description"+
                "```"+
                desc+
                "```"
            }
            ])
        return completion.choices[0].message.content
    def makeLogo(self,prompt):
        
        res = self.ai.Image.create( 
        prompt=prompt, 
        n=1, 
        size="256x256", 
        ) 
        return res["data"][0]["url"]
    