def get_ai_answer(question):

    question = question.lower().strip()

    answers = {

        "python":
        "Python is a high-level programming language used for web development, AI, automation, and data science.",

        "react":
        "React is a JavaScript library used to build interactive user interfaces using components.",

        "django":
        "Django is a Python web framework used to build secure and scalable web applications.",

        "sql":
        "SQL is a language used to store, retrieve, update, and manage data in relational databases.",

        "mysql":
        "MySQL is a relational database management system used to store and manage application data.",

        "html":
        "HTML is used to create the structure of web pages.",

        "css":
        "CSS is used to style and design web pages.",

        "javascript":
        "JavaScript is a programming language used to make web pages interactive.",

        "api":
        "An API allows different software applications to communicate with each other.",

        "machine learning":
        "Machine learning is a branch of AI where computers learn patterns from data and make predictions.",

        "artificial intelligence":
        "Artificial Intelligence is the field of creating computer systems that can perform tasks that normally require human intelligence.",

        "python list":
        "A Python list is an ordered and mutable collection that can store multiple values.",

        "python dictionary":
        "A Python dictionary stores data as key-value pairs.",

        "function":
        "A function is a reusable block of code designed to perform a specific task.",

        "class":
        "A class is a blueprint for creating objects in Python.",

        "object":
        "An object is an instance of a class containing data and behavior."

    }

    for keyword in answers:

        if keyword in question:
            return answers[keyword]

    return (
        "I don't have an answer for this question yet. "
        "Please create a support ticket so a teacher can help you."
    )