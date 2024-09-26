import json
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import NoSuchElementException
from webdriver_manager.chrome import ChromeDriverManager

options = Options()
options.add_argument("--headless")

driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))

driver.get('https://neetcode.io/practice')

elements = driver.find_elements(By.CLASS_NAME, 'tab-link')

allButton = elements[3]
allButton.click()

# viewButton = driver.find_elements(By.CLASS_NAME, 'button navbar-btn is-rounded is-info is-outlined has-tooltip-bottom')

links = driver.find_elements(By.XPATH, "//a[starts-with(@href, 'https://leetcode.com')]")
buttons = driver.find_elements(By.ID, "diff-btn")

output = []

for i in range(len(links)):
    link_text = links[i].get_attribute('href')

    name = link_text[len('https://leetcode.com/problems/'):].rstrip("/").split("-")
    name = " ".join(name)
    name = name.title()

    difficulty = buttons[i].get_attribute('innerHTML')
    difficulty = difficulty[len('<b _ngcontent-pkm-c41="">'):].rstrip("</b>")
    print(difficulty)

    question = {
        "name": name,
        "link": link_text,
        "difficulty": difficulty,
    }

    output.append(question)

driver.quit()

with open('lcdb.json', 'w') as json_file:
    json.dump(output, json_file, indent=4)

print(f'Retrieved problems: {str(len(output))}')