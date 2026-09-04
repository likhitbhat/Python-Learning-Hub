import type { MiniProject } from '../types';

export const MINI_PROJECTS: MiniProject[] = [
  {
    id: 'rpg-adventure',
    title: 'Text-Based RPG Adventure',
    level: 'beginner',
    xp: 150,
    iconName: 'Gamepad2',
    theme: 'purple',
    description: 'Build an interactive fantasy quest game with health points, random dice rolls, and decision branching.',
    learningOutcome: 'Master if-else logic, random module, variables, user input loops, and print formatting.',
    starterCode: `# PROJECT: Text-Based RPG Adventure
import random

print("=== WELCOME TO THE PYTHON DUNGEON ===")
player_name = "Arthur"  # Customize your hero's name here!
hero_hp = 100
gold = 0

print(f"Welcome, Hero {player_name}! You enter the dark cave...")

# TODO: Roll dice (random.randint(1, 20)) and handle fighting a Goblin
roll = random.randint(1, 20)
print(f"You rolled a {roll}!")

if roll >= 10:
    print("Victory! You defeated the Goblin and found 50 Gold!")
    gold += 50
else:
    print("Ouch! The Goblin struck you for 30 damage!")
    hero_hp -= 30

print(f"Status: HP={hero_hp} | Gold={gold}")`,
    solutionCode: `import random

def play_game():
    player_name = "Arthur"
    hero_hp = 100
    gold = 0

    print(f"=== {player_name.upper()}'S DUNGEON QUEST ===")
    
    monsters = ["Goblin", "Dragon", "Shadow Knight"]
    for monster in monsters:
        print(f"\\nA wild {monster} appears!")
        roll = random.randint(1, 20)
        print(f"Attack Roll: {roll}/20")
        
        if roll >= 12:
            reward = random.randint(20, 100)
            gold += reward
            print(f"Success! Defeated {monster} and earned {reward} Gold!")
        else:
            damage = random.randint(15, 35)
            hero_hp -= damage
            print(f"Defeat! {monster} dealt {damage} damage! Remaining HP: {hero_hp}")
        
        if hero_hp <= 0:
            print("\\nGAME OVER! Your hero has fallen.")
            return

    print(f"\\nVICTORY! Quest completed with {hero_hp} HP and {gold} Gold!")

play_game()`
  },
  {
    id: 'password-analyzer',
    title: 'Password Generator & Strength Analyzer',
    level: 'beginner',
    xp: 150,
    iconName: 'KeyRound',
    theme: 'emerald',
    description: 'Generate secure random passwords using custom character sets and evaluate their entropy strength.',
    learningOutcome: 'Learn string manipulation, string module, random choices, and boolean checks.',
    starterCode: `# PROJECT: Secure Password Generator
import random
import string

def generate_password(length=12):
    characters = string.ascii_letters + string.digits + "!@#$%^&*"
    password = "".join(random.choice(characters) for _ in range(length))
    return password

# Test generation
my_pass = generate_password(16)
print("Generated Secure Password:", my_pass)`,
    solutionCode: `import random
import string

def generate_password(length=12):
    chars = string.ascii_letters + string.digits + "!@#$%^&*"
    return "".join(random.choice(chars) for _ in range(length))

def check_strength(pwd):
    has_upper = any(c.isupper() for c in pwd)
    has_lower = any(c.islower() for c in pwd)
    has_digit = any(c.isdigit() for c in pwd)
    has_spec  = any(c in "!@#$%^&*" for c in pwd)
    
    score = sum([has_upper, has_lower, has_digit, has_spec])
    if len(pwd) >= 12 and score == 4:
        return "VERY STRONG 🔒"
    elif score >= 3:
        return "STRONG 👍"
    else:
        return "WEAK ⚠️"

pwd = generate_password(14)
print(f"Generated Password: {pwd}")
print(f"Security Rating: {check_strength(pwd)}")`
  },
  {
    id: 'grade-tracker',
    title: 'Student Grade & Analytics Tracker',
    level: 'intermediate',
    xp: 250,
    iconName: 'GraduationCap',
    theme: 'blue',
    description: 'Build a grade management system that calculates class averages, median, and grade letter distributions.',
    learningOutcome: 'Master dictionaries, list methods, statistical functions, and structured data handling.',
    starterCode: `# PROJECT: Student Grade Analytics
students = {
    "Alice": [88, 92, 95],
    "Bob": [70, 65, 78],
    "Charlie": [90, 85, 88]
}

def calculate_averages(data):
    averages = {}
    for name, grades in data.items():
        avg = sum(grades) / len(grades)
        averages[name] = round(avg, 2)
    return averages

print("Class Student Averages:", calculate_averages(students))`,
    solutionCode: `students = {
    "Alice": [88, 92, 95],
    "Bob": [70, 65, 78],
    "Charlie": [90, 85, 88],
    "Diana": [98, 95, 100]
}

def analyze_class(data):
    print("=== CLASS PERFORMANCE REPORT ===")
    all_scores = []
    
    for name, grades in data.items():
        avg = sum(grades) / len(grades)
        all_scores.extend(grades)
        grade_letter = 'A' if avg >= 90 else 'B' if avg >= 80 else 'C'
        print(f"Student: {name:<10} | Avg: {avg:.1f}% | Grade: {grade_letter}")

    class_avg = sum(all_scores) / len(all_scores)
    print("-" * 35)
    print(f"Class Overall Average: {class_avg:.2f}%")
    print(f"Highest Score Achieved: {max(all_scores)}%")

analyze_class(students)`
  },
  {
    id: 'web-scraper-simulator',
    title: 'E-Commerce Price Scraper Simulator',
    level: 'intermediate',
    xp: 250,
    iconName: 'Globe',
    theme: 'cyan',
    description: 'Simulate scraping e-commerce websites, parsing product prices, and identifying discount deals.',
    learningOutcome: 'Learn string parsing, regular expressions (re), list comprehensions, and data filtering.',
    starterCode: `# PROJECT: E-Commerce Product Parser
import re

html_data = """
<div class="product"><span class="title">Laptop</span><span class="price">$899.99</span></div>
<div class="product"><span class="title">Headphones</span><span class="price">$149.50</span></div>
<div class="product"><span class="title">Mouse</span><span class="price">$25.00</span></div>
"""

prices = re.findall(r'\\$(\\d+\\.\\d{2})', html_data)
prices = [float(p) for p in prices]
print("Extracted Prices:", prices)`,
    solutionCode: `import re

html_sample = """
<div className="card"><h3 className="name">Gaming Laptop</h3><p className="price">$1299.99</p></div>
<div className="card"><h3 className="name">Wireless Mouse</h3><p className="price">$29.99</p></div>
<div className="card"><h3 className="name">4K Monitor</h3><p className="price">$399.00</p></div>
"""

products = re.findall(r'<h3 className="name">(.*?)</h3><p className="price">\\$(.*?)</p>', html_sample)

print("=== EXTRACTED E-COMMERCE PRODUCTS ===")
deal_threshold = 100.0

for name, price_str in products:
    price = float(price_str)
    badge = "🔥 BUDGET DEAL" if price < deal_threshold else "PREMIUM"
    print(f"Product: {name:<20} | Price: \${price:<8.2f} | [{badge}]")`
  },
  {
    id: 'compound-interest-calc',
    title: 'Financial Compound Interest Simulator',
    level: 'advanced',
    xp: 350,
    iconName: 'TrendingUp',
    theme: 'teal',
    description: 'Simulate multi-year investment growth with monthly contributions and variable interest compounding.',
    learningOutcome: 'Understand financial math, list transformations, table formatting, and matplotlib-style simulation.',
    starterCode: `# PROJECT: Compound Interest Simulator
def simulate_growth(principal, monthly_contrib, annual_rate, years):
    monthly_rate = annual_rate / 12 / 100
    total_months = years * 12
    balance = principal

    for m in range(1, total_months + 1):
        balance = (balance + monthly_contrib) * (1 + monthly_rate)

    return round(balance, 2)

final_val = simulate_growth(1000, 200, 7.5, 10)
print(f"10-Year Investment Value: \${final_val}")`,
    solutionCode: `def investment_breakdown(principal, monthly_contrib, annual_rate, years):
    monthly_rate = annual_rate / 12 / 100
    balance = principal
    total_deposited = principal
    
    print(f"=== {years}-YEAR INVESTMENT PROJECTION ===")
    print(f"Initial: \${principal} | Monthly: \${monthly_contrib} | Rate: {annual_rate}%")
    print("-" * 50)

    for year in range(1, years + 1):
        for _ in range(12):
            balance = (balance + monthly_contrib) * (1 + monthly_rate)
            total_deposited += monthly_contrib
            
        interest_earned = balance - total_deposited
        print(f"Year {year:2d} | Total: \${balance:10.2f} | Deposited: \${total_deposited:10.2f} | Interest: \${interest_earned:10.2f}")

investment_breakdown(5000, 300, 8.0, 5)`
  }
];
