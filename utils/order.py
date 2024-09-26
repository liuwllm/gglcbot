import json
import random

# Step 1: Create a list of numbers from 1 to 580
numbers = list(range(1, 581))

# Step 2: Shuffle the list to randomize the order
random.shuffle(numbers)

# Step 3: Write the shuffled list to a JSON file
with open('numbers.json', 'w') as json_file:
    json.dump(numbers, json_file)

print("JSON file created with numbers from 1 to 580 in random order.")