import { useState, useEffect, useCallback } from 'react'
import './ClickerGame.css'

const ClickerGame = () => {
  const [lines, setLines] = useState(0)
  const [linesPerSecond, setLinesPerSecond] = useState(0)
  const [clickPower, setClickPower] = useState(1)
  const [money, setMoney] = useState(0)
  const [level, setLevel] = useState(1)
  const [currentChallenge, setCurrentChallenge] = useState(null)
  const [showChallengeModal, setShowChallengeModal] = useState(false)
  const [userAnswer, setUserAnswer] = useState('')
  const [challengeStreak, setChallengeStreak] = useState(0)
  const [moneySpent, setMoneySpent] = useState(0) // Track money spent on upgrades

  // Coding challenges
  const challenges = [
    {
      id: 1,
      difficulty: 'Easy',
      reward: 50,
      question: 'What does this JavaScript code return?\n\n```javascript\nconsole.log(2 + 2 * 3)\n```',
      answer: '8',
      explanation: '2 + 2 * 3 = 2 + 6 = 8 (multiplication happens first)'
    },
    {
      id: 2,
      difficulty: 'Easy',
      reward: 75,
      question: 'What is the correct way to declare a variable in JavaScript?',
      options: ['var x = 5', 'let x = 5', 'const x = 5', 'All of the above'],
      answer: 'All of the above',
      explanation: 'All three are valid ways to declare variables in JavaScript'
    },
    {
      id: 3,
      difficulty: 'Medium',
      reward: 150,
      question: 'What will this code output?\n\n```javascript\nlet arr = [1, 2, 3];\narr.push(4);\nconsole.log(arr.length);\n```',
      answer: '4',
      explanation: 'push() adds an element to the end, making the length 4'
    },
    {
      id: 4,
      difficulty: 'Medium',
      reward: 200,
      question: 'Which method removes the last element from an array?',
      options: ['pop()', 'push()', 'shift()', 'unshift()'],
      answer: 'pop()',
      explanation: 'pop() removes and returns the last element of an array'
    },
    {
      id: 5,
      difficulty: 'Hard',
      reward: 300,
      question: 'What is the output?\n\n```javascript\nconsole.log(typeof null);\n```',
      answer: 'object',
      explanation: 'This is a famous JavaScript quirk - typeof null returns "object"'
    },
    {
      id: 6,
      difficulty: 'Hard',
      reward: 400,
      question: 'What does this return?\n\n```javascript\n[] + [] + "foo".split("")\n```',
      answer: 'f,o,o',
      explanation: '[] + [] = "" (empty string), then + ["f","o","o"] = "f,o,o"'
    },
    {
      id: 7,
      difficulty: 'Easy',
      reward: 60,
      question: 'How do you write a single-line comment in JavaScript?',
      options: ['/* comment */', '// comment', '<!-- comment -->', '# comment'],
      answer: '// comment',
      explanation: '// is used for single-line comments in JavaScript'
    },
    {
      id: 8,
      difficulty: 'Medium',
      reward: 180,
      question: 'What is the correct way to check if a variable is an array?',
      options: ['typeof arr === "array"', 'arr instanceof Array', 'Array.isArray(arr)', 'Both B and C'],
      answer: 'Both B and C',
      explanation: 'Both instanceof Array and Array.isArray() work, but Array.isArray() is preferred'
    },
    {
      id: 9,
      difficulty: 'Easy',
      reward: 50,
      question: 'What is the correct way to create a function in JavaScript?',
      options: ['function myFunc() {}', 'def myFunc():', 'func myFunc() {}', 'create function myFunc()'],
      answer: 'function myFunc() {}',
      explanation: 'Functions in JavaScript are declared with the "function" keyword'
    },
    {
      id: 10,
      difficulty: 'Easy',
      reward: 55,
      question: 'What does this code output?\n\n```javascript\nconsole.log("Hello" + " " + "World");\n```',
      answer: 'Hello World',
      explanation: 'String concatenation with + operator joins the strings together'
    },
    {
      id: 11,
      difficulty: 'Medium',
      reward: 150,
      question: 'What is the result?\n\n```javascript\nlet x = 5;\nlet y = x++;\nconsole.log(y);\n```',
      answer: '5',
      explanation: 'x++ is post-increment, so y gets the value of x before incrementing'
    },
    {
      id: 12,
      difficulty: 'Hard',
      reward: 350,
      question: 'What does this return?\n\n```javascript\n(function() { return typeof arguments; })();\n```',
      answer: 'object',
      explanation: 'The arguments object is of type "object", not "array"'
    },
    {
      id: 13,
      difficulty: 'Easy',
      reward: 60,
      question: 'Which method adds an element to the beginning of an array?',
      options: ['push()', 'unshift()', 'shift()', 'pop()'],
      answer: 'unshift()',
      explanation: 'unshift() adds elements to the beginning of an array'
    },
    {
      id: 14,
      difficulty: 'Medium',
      reward: 170,
      question: 'What is the output?\n\n```javascript\nlet obj = {a: 1};\nlet obj2 = obj;\nobj2.a = 2;\nconsole.log(obj.a);\n```',
      answer: '2',
      explanation: 'Objects are passed by reference, so both variables point to the same object'
    },
    {
      id: 15,
      difficulty: 'Hard',
      reward: 400,
      question: 'What does this return?\n\n```javascript\n0.1 + 0.2 === 0.3\n```',
      answer: 'false',
      explanation: 'Floating point precision issues make 0.1 + 0.2 = 0.30000000000000004'
    },
    {
      id: 16,
      difficulty: 'Easy',
      reward: 65,
      question: 'How do you access the first element of an array called "arr"?',
      options: ['arr[1]', 'arr[0]', 'arr.first()', 'arr.get(0)'],
      answer: 'arr[0]',
      explanation: 'Arrays are zero-indexed, so the first element is at index 0'
    },
    {
      id: 17,
      difficulty: 'Medium',
      reward: 160,
      question: 'What is the result?\n\n```javascript\n"5" - 3\n```',
      answer: '2',
      explanation: 'The - operator converts the string "5" to number 5, then subtracts 3'
    },
    {
      id: 18,
      difficulty: 'Hard',
      reward: 380,
      question: 'What does this output?\n\n```javascript\nvar a = 1;\nfunction test() {\n  console.log(a);\n  var a = 2;\n}\ntest();\n```',
      answer: 'undefined',
      explanation: 'Variable hoisting moves "var a" to the top, but not its assignment'
    },
    {
      id: 19,
      difficulty: 'Easy',
      reward: 70,
      question: 'Which operator checks for both value and type equality?',
      options: ['==', '===', '=', '!='],
      answer: '===',
      explanation: '=== checks for strict equality (both value and type must match)'
    },
    {
      id: 20,
      difficulty: 'Medium',
      reward: 190,
      question: 'What is the output?\n\n```javascript\nlet arr = [1, 2, 3];\narr[10] = 99;\nconsole.log(arr.length);\n```',
      answer: '11',
      explanation: 'Setting arr[10] creates empty slots, making the length 11'
    },
    {
      id: 21,
      difficulty: 'Hard',
      reward: 420,
      question: 'What does this return?\n\n```javascript\n(![]+[])[+[]]+(![]+[])[+!+[]]+([![]]+[][[]])[+!+[]+[+[]]]\n```',
      answer: 'lol',
      explanation: 'This is obfuscated JavaScript that spells "lol" using type coercion'
    },
    {
      id: 22,
      difficulty: 'Easy',
      reward: 55,
      question: 'What keyword is used to declare a constant in JavaScript?',
      options: ['const', 'constant', 'final', 'readonly'],
      answer: 'const',
      explanation: 'const is used to declare constants that cannot be reassigned'
    },
    {
      id: 23,
      difficulty: 'Medium',
      reward: 175,
      question: 'What is the result?\n\n```javascript\nlet x = [1, 2, 3];\nlet y = x;\ny.push(4);\nconsole.log(x.length);\n```',
      answer: '4',
      explanation: 'Arrays are objects passed by reference, so x and y point to the same array'
    },
    {
      id: 24,
      difficulty: 'Hard',
      reward: 450,
      question: 'What does this return?\n\n```javascript\nparseInt("08")\n```',
      answer: '8',
      explanation: 'parseInt converts "08" to 8 (leading zeros are ignored in modern JS)'
    },
    {
      id: 25,
      difficulty: 'Easy',
      reward: 65,
      question: 'Which method converts a string to lowercase?',
      options: ['toLowerCase()', 'toLower()', 'lower()', 'downCase()'],
      answer: 'toLowerCase()',
      explanation: 'toLowerCase() converts all characters in a string to lowercase'
    },
    {
      id: 26,
      difficulty: 'Medium',
      reward: 185,
      question: 'What is the output?\n\n```javascript\nfunction test() {\n  return\n  {\n    name: "John"\n  }\n}\nconsole.log(test());\n```',
      answer: 'undefined',
      explanation: 'Automatic semicolon insertion adds ; after return, making it return undefined'
    },
    {
      id: 27,
      difficulty: 'Hard',
      reward: 390,
      question: 'What does this return?\n\n```javascript\n[] == ![]\n```',
      answer: 'true',
      explanation: '![] is false, [] == false becomes "" == false, which is true'
    },
    {
      id: 28,
      difficulty: 'Easy',
      reward: 75,
      question: 'How do you create a multi-line comment in JavaScript?',
      options: ['/* comment */', '// comment', '<!-- comment -->', '### comment ###'],
      answer: '/* comment */',
      explanation: '/* */ is used for multi-line comments in JavaScript'
    },
    {
      id: 29,
      difficulty: 'Medium',
      reward: 200,
      question: 'What is the result?\n\n```javascript\nlet a = 3;\nlet b = new Number(3);\nconsole.log(a == b);\n```',
      answer: 'true',
      explanation: '== performs type coercion, so primitive 3 equals Number object 3'
    },
    {
      id: 30,
      difficulty: 'Hard',
      reward: 410,
      question: 'What does this output?\n\n```javascript\nfor (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 100);\n}\n```',
      answer: '3 3 3',
      explanation: 'var has function scope, so all timeouts reference the same i, which is 3'
    },
    {
      id: 31,
      difficulty: 'Easy',
      reward: 80,
      question: 'Which method removes the first element from an array?',
      options: ['shift()', 'unshift()', 'pop()', 'push()'],
      answer: 'shift()',
      explanation: 'shift() removes and returns the first element of an array'
    },
    {
      id: 32,
      difficulty: 'Medium',
      reward: 165,
      question: 'What is the output?\n\n```javascript\nlet x = 1;\nlet y = x || 2;\nconsole.log(y);\n```',
      answer: '1',
      explanation: 'Logical OR returns the first truthy value, which is 1'
    },
    {
      id: 33,
      difficulty: 'Hard',
      reward: 430,
      question: 'What does this return?\n\n```javascript\ntypeof NaN\n```',
      answer: 'number',
      explanation: 'NaN (Not a Number) is ironically of type "number" in JavaScript'
    },
    {
      id: 34,
      difficulty: 'Easy',
      reward: 70,
      question: 'What is the correct way to write an if statement?',
      options: ['if (x == 5)', 'if x == 5:', 'if x == 5 then', 'if (x == 5) then'],
      answer: 'if (x == 5)',
      explanation: 'JavaScript if statements use parentheses around the condition'
    },
    {
      id: 35,
      difficulty: 'Medium',
      reward: 195,
      question: 'What is the result?\n\n```javascript\nlet obj = {};\nobj.a = 1;\ndelete obj.a;\nconsole.log(obj.a);\n```',
      answer: 'undefined',
      explanation: 'delete removes the property, so accessing it returns undefined'
    },
    {
      id: 36,
      difficulty: 'Hard',
      reward: 460,
      question: 'What does this return?\n\n```javascript\n+!![]  + +!![]\n```',
      answer: '2',
      explanation: '!![] is true, +true is 1, so 1 + 1 = 2'
    },
      {
      id: 37,
      difficulty: 'Easy',
      reward: 85,
      question: 'Which method joins array elements into a string?',
      options: ['join()', 'concat()', 'merge()', 'combine()'],
      answer: 'join()',
      explanation: 'join() creates a string by concatenating array elements with a separator'
    },
    {
      id: 38,
      difficulty: 'Medium',
      reward: 210,
      question: 'What is the output?\n\n```javascript\nlet a = [1, 2, 3];\nlet b = a.map(x => x * 2);\nconsole.log(a.length);\n```',
      answer: '3',
      explanation: 'map() creates a new array and does not modify the original array'
    }
  ]

  // Upgrades
  const [upgrades, setUpgrades] = useState({
    keyboard: { count: 0, cost: 15, power: 1 },
    monitor: { count: 0, cost: 100, power: 5 },
    coffee: { count: 0, cost: 500, power: 20 },
    intern: { count: 0, cost: 2000, power: 50 },
    developer: { count: 0, cost: 10000, power: 200 },
    senior: { count: 0, cost: 50000, power: 1000 },
    architect: { count: 0, cost: 250000, power: 5000 }
  })

  const upgradeData = {
    keyboard: { name: "Better Keyboard", emoji: "⌨️", desc: "Types faster" },
    monitor: { name: "Dual Monitor", emoji: "🖥️", desc: "See more code" },
    coffee: { name: "Coffee Machine", emoji: "☕", desc: "Stay awake longer" },
    intern: { name: "Hire Intern", emoji: "👨‍💻", desc: "Writes basic code" },
    developer: { name: "Junior Dev", emoji: "👩‍💻", desc: "Solid coding skills" },
    senior: { name: "Senior Dev", emoji: "🧑‍💼", desc: "Expert programmer" },
    architect: { name: "Tech Lead", emoji: "👑", desc: "Designs systems" }
  }

  // Money from lines (1 dollar per 5 lines) - accounting for money spent
  useEffect(() => {
    const earnedMoney = Math.floor(lines / 5)
    setMoney(earnedMoney - moneySpent)
  }, [lines, moneySpent])

  // Auto-generate lines per second
  useEffect(() => {
    const interval = setInterval(() => {
      if (linesPerSecond > 0) {
        setLines(prev => prev + linesPerSecond)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [linesPerSecond])

  // Calculate lines per second from upgrades
  useEffect(() => {
    const totalLPS = Object.entries(upgrades).reduce((total, [, upgrade]) => {
      return total + (upgrade.count * upgrade.power)
    }, 0)
    setLinesPerSecond(totalLPS)
  }, [upgrades])

  // Level up system
  useEffect(() => {
    const newLevel = Math.floor(lines / 1000) + 1
    if (newLevel > level) {
      setLevel(newLevel)
      setClickPower(prev => prev + 1)
    }
  }, [lines, level])

  // Click handler
  const handleClick = useCallback(() => {
    setLines(prev => prev + clickPower)
  }, [clickPower])

  // Buy upgrade - properly subtract money
  const buyUpgrade = (upgradeKey) => {
    const upgrade = upgrades[upgradeKey]
    if (money >= upgrade.cost) {
      setMoneySpent(prev => prev + upgrade.cost)
      setUpgrades(prev => ({
        ...prev,
        [upgradeKey]: {
          ...upgrade,
          count: upgrade.count + 1,
          cost: Math.floor(upgrade.cost * 1.15)
        }
      }))
    }
  }

  // Challenge system
  const startChallenge = () => {
    const availableChallenges = challenges.filter(c =>
      (c.difficulty === 'Easy' && level >= 1) ||
      (c.difficulty === 'Medium' && level >= 3) ||
      (c.difficulty === 'Hard' && level >= 5)
    )

    if (availableChallenges.length > 0) {
      const randomChallenge = availableChallenges[Math.floor(Math.random() * availableChallenges.length)]
      setCurrentChallenge(randomChallenge)
      setShowChallengeModal(true)
      setUserAnswer('')
    }
  }

  const submitAnswer = () => {
    if (!currentChallenge) return

    const isCorrect = userAnswer.toLowerCase().trim() === currentChallenge.answer.toLowerCase().trim()

    if (isCorrect) {
      const bonusMultiplier = 1 + (challengeStreak * 0.1)
      const reward = Math.floor(currentChallenge.reward * bonusMultiplier)
      setMoneySpent(prev => prev - reward) // Add money by reducing money spent
      setChallengeStreak(prev => prev + 1)

      // Show success message
      alert(`🎉 Correct! You earned $${reward}!\nStreak: ${challengeStreak + 1}\n\n${currentChallenge.explanation}`)
    } else {
      setChallengeStreak(0)
      alert(`❌ Incorrect. The answer was: ${currentChallenge.answer}\n\n${currentChallenge.explanation}`)
    }

    setShowChallengeModal(false)
    setCurrentChallenge(null)
    setUserAnswer('')
  }

  // Format large numbers
  const formatNumber = (num) => {
    if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B'
    if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M'
    if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K'
    return Math.floor(num).toString()
  }

  // Reset game
  const resetGame = () => {
    if (window.confirm('Are you sure you want to reset your progress?')) {
      setLines(0)
      setLinesPerSecond(0)
      setClickPower(1)
      setMoney(0)
      setLevel(1)
      setChallengeStreak(0)
      setMoneySpent(0)
      setUpgrades({
        keyboard: { count: 0, cost: 15, power: 1 },
        monitor: { count: 0, cost: 100, power: 5 },
        coffee: { count: 0, cost: 500, power: 20 },
        intern: { count: 0, cost: 2000, power: 50 },
        developer: { count: 0, cost: 10000, power: 200 },
        senior: { count: 0, cost: 50000, power: 1000 },
        architect: { count: 0, cost: 250000, power: 5000 }
      })
    }
  }

  return (
    <div className="clicker-game">
      <div className="game-header">
        <h1>💻 Code Clicker</h1>
        <div className="header-buttons">
          <button className="reset-btn" onClick={resetGame}>Reset Game</button>
        </div>
      </div>

      <div className="game-container">
        {/* Stats Panel */}
        <div className="stats-panel">
          <div className="stat">
            <span className="stat-label">Lines of Code:</span>
            <span className="stat-value">{formatNumber(lines)}</span>
          </div>
          <div className="stat money-stat">
            <span className="stat-label">Money:</span>
            <span className="stat-value">${formatNumber(money)}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Level:</span>
            <span className="stat-value">{level}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Lines/sec:</span>
            <span className="stat-value">{formatNumber(linesPerSecond)}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Click Power:</span>
            <span className="stat-value">{clickPower}</span>
          </div>
          <div className="stat streak-stat">
            <span className="stat-label">Challenge Streak:</span>
            <span className="stat-value">{challengeStreak}🔥</span>
          </div>
        </div>

        {/* Main Game Area */}
        <div className="game-main">
          <div className="click-area">
            <button
              className="main-click-btn"
              onClick={handleClick}
            >
              <div className="click-content">
                <div className="code-icon">💻</div>
                <div className="click-text">Write Code!</div>
                <div className="click-power">+{clickPower} lines</div>
              </div>
            </button>
          </div>

          <div className="money-info">
            <div className="money-rate">💰 $1 per 5 lines of code</div>
            <div className="next-dollar">Next $1 in {5 - (lines % 5)} lines</div>
          </div>

          <div className="progress-bar">
            <div className="progress-label">Progress to Level {level + 1}</div>
            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: `${((lines % 1000) / 1000) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="challenge-section">
            <button
              className="challenge-btn"
              onClick={startChallenge}
              disabled={level < 1}
            >
              🧠 Solve Coding Challenge
            </button>
          </div>
        </div>

        {/* Upgrades Panel */}
        <div className="upgrades-panel">
          <h3>🛒 Upgrades</h3>
          <div className="upgrades-list">
            {Object.entries(upgradeData).map(([upgradeKey, data]) => {
              const upgrade = upgrades[upgradeKey]
              const canAfford = money >= upgrade.cost

              return (
                <div
                  key={upgradeKey}
                  className={`upgrade-item ${canAfford ? 'affordable' : 'expensive'}`}
                  onClick={() => canAfford && buyUpgrade(upgradeKey)}
                >
                  <div className="upgrade-icon">{data.emoji}</div>
                  <div className="upgrade-info">
                    <div className="upgrade-name">{data.name}</div>
                    <div className="upgrade-desc">{data.desc}</div>
                    <div className="upgrade-stats">
                      +{upgrade.power} LPS • Owned: {upgrade.count}
                    </div>
                  </div>
                  <div className="upgrade-cost">
                    ${formatNumber(upgrade.cost)}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Challenge Modal */}
      {showChallengeModal && currentChallenge && (
        <div className="modal-overlay">
          <div className="challenge-modal">
            <div className="challenge-header">
              <h3>🧠 Coding Challenge</h3>
              <div className="challenge-info">
                <span className={`difficulty ${currentChallenge.difficulty.toLowerCase()}`}>
                  {currentChallenge.difficulty}
                </span>
                <span className="reward">💰 ${currentChallenge.reward}</span>
                {challengeStreak > 0 && (
                  <span className="streak-bonus">
                    🔥 +{challengeStreak * 10}% bonus
                  </span>
                )}
              </div>
            </div>

            <div className="challenge-content">
              <div className="challenge-question">
                {currentChallenge.question.split('\n').map((line, index) => (
                  <div key={index}>
                    {line.includes('```') ? (
                      <code className="code-block">{line.replace(/```\w*/, '')}</code>
                    ) : (
                      line
                    )}
                  </div>
                ))}
              </div>

              {currentChallenge.options ? (
                <div className="challenge-options">
                  {currentChallenge.options.map((option, index) => (
                    <button
                      key={index}
                      className={`option-btn ${userAnswer === option ? 'selected' : ''}`}
                      onClick={() => setUserAnswer(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="challenge-input">
                  <input
                    type="text"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="Enter your answer..."
                    className="answer-input"
                    onKeyPress={(e) => e.key === 'Enter' && submitAnswer()}
                  />
                </div>
              )}
            </div>

            <div className="challenge-actions">
              <button
                className="submit-btn"
                onClick={submitAnswer}
                disabled={!userAnswer.trim()}
              >
                Submit Answer
              </button>
              <button
                className="skip-btn"
                onClick={() => {
                  setShowChallengeModal(false)
                  setCurrentChallenge(null)
                  setUserAnswer('')
                }}
              >
                Skip Challenge
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Achievements */}
      <div className="achievements">
        <h3>🏆 Achievements</h3>
        <div className="achievement-list">
          {lines >= 100 && <div className="achievement">First 100 Lines!</div>}
          {lines >= 1000 && <div className="achievement">Coding Rookie</div>}
          {lines >= 10000 && <div className="achievement">Code Warrior</div>}
          {level >= 10 && <div className="achievement">Level 10 Master</div>}
          {money >= 1000 && <div className="achievement">Rich Programmer</div>}
          {money >= 10000 && <div className="achievement">Coding Millionaire</div>}
          {challengeStreak >= 3 && <div className="achievement">Challenge Streak x3</div>}
          {challengeStreak >= 5 && <div className="achievement">Challenge Master</div>}
          {challengeStreak >= 10 && <div className="achievement">Coding Genius</div>}
        </div>
      </div>
    </div>
  )
}

export default ClickerGame

