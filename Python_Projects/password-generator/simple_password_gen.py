import random
import string

def gen_pass(min_len, nums = True, special_char = True):
# Defining character pool 
    letters = string.ascii_letters
    digits = string.digits
    special = string.punctuation

# Combining character pools based on user input   
    chars = letters
    if nums:
        chars += digits
    if special_char:
        chars += special

# Making the password length to be longer than the minimum length             
    real_len = min_len + random.randint(1, 10)    
    
    pwd = ""
    meets_criteria = False
    has_num = False
    has_special = False

# Generating the password   
    while not meets_criteria or len(pwd) < real_len:
        new_char = random.choice(chars)
        pwd += new_char

# Checking for required character types     
        if new_char in digits:
            has_num = True
        elif new_char in special:
            has_special = True
        
        meets_criteria = True
        if nums:
            meets_criteria = has_num
        if special_char:
            meets_criteria = meets_criteria and has_special
    return pwd

# Getting user input    
min_len = int(input("Enter password's minimum length: "))
has_num = input("Do you want to have numbers (y/n)?").lower() == "y"
has_special = input("Do you want to have special characters (y/n)?").lower() == "y"

# Generating and printing the password
pwd = gen_pass(min_len, has_num, has_special)
print("Your generated password is: " ,pwd)