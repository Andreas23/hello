let questions = [];
    let currentMode = 'multiplication';
    let timer;
    let timerCountdown;

    function showSection(mode) {
      currentMode = mode;
      document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
      event.target.classList.add('active');
      document.getElementById("title").textContent = {
        multiplication: "🧮 Multiplication Trainer",
        division: "➗ Division Trainer",
        squares: "² Squares Trainer",
        squareroots: "√ Square Roots Trainer",
        decimals: "🔢 Decimals Trainer",
        fractions: "½ Fractions Trainer"
      }[mode];
      document.getElementById("quizForm").innerHTML = "";
      document.getElementById("result").innerHTML = "";
      document.getElementById("refreshContainer").innerHTML = "";
      clearTimeout(timerCountdown);
      document.getElementById("time").textContent = "00:00";
    }

    function startQuiz() {
      const count = parseInt(document.getElementById("count").value);
      const timeMinutes = parseInt(document.getElementById("timerMinutes").value);
      const form = document.getElementById("quizForm");
      const resultDiv = document.getElementById("result");

      questions = [];
      form.innerHTML = "";
      resultDiv.innerHTML = "";
      document.getElementById("refreshContainer").innerHTML = "";

      for (let i = 0; i < count; i++) {
        let a, b, questionStr, answer;

        switch (currentMode) {
          case 'multiplication':
            a = Math.floor(Math.random() * 16) + 1;
            b = Math.floor(Math.random() * 16) + 1;
            questionStr = `${a} × ${b}`;
            answer = a * b;
            break;
          case 'division':
            b = Math.floor(Math.random() * 15) + 1;
            answer = Math.floor(Math.random() * 16) + 1;
            a = b * answer;
            questionStr = `${a} ÷ ${b}`;
            break;
          case 'squares':
            a = Math.floor(Math.random() * 21);
            questionStr = `${a}²`;
            answer = a * a;
            break;
          case 'squareroots':
            a = Math.floor(Math.random() * 13);
            questionStr = `√${a * a}`;
            answer = a;
            break;
          case 'decimals':
            a = (Math.random() * 10).toFixed(1);
            b = (Math.random() * 10).toFixed(1);
            const ops = ['+', '-', '×', '÷'];
            const op = ops[Math.floor(Math.random() * ops.length)];
            questionStr = `${a} ${op} ${b}`;
            switch(op) {
              case '+': answer = (parseFloat(a) + parseFloat(b)).toFixed(1); break;
              case '-': answer = (parseFloat(a) - parseFloat(b)).toFixed(1); break;
              case '×': answer = (parseFloat(a) * parseFloat(b)).toFixed(1); break;
              case '÷': answer = (parseFloat(b) === 0 ? 0 : (parseFloat(a) / parseFloat(b)).toFixed(1)); break;
            }
            break;
          case 'fractions':
            let num1 = Math.floor(Math.random() * 9) + 1;
            let den1 = Math.floor(Math.random() * 9) + 1;
            let num2 = Math.floor(Math.random() * 9) + 1;
            let den2 = Math.floor(Math.random() * 9) + 1;
            const opF = ['+', '-', '×', '÷'][Math.floor(Math.random() * 4)];
            questionStr = `${num1}/${den1} ${opF} ${num2}/${den2}`;
            let frac1 = num1 / den1;
            let frac2 = num2 / den2;
            switch(opF) {
              case '+': answer = (frac1 + frac2).toFixed(2); break;
              case '-': answer = (frac1 - frac2).toFixed(2); break;
              case '×': answer = (frac1 * frac2).toFixed(2); break;
              case '÷': answer = (frac2 === 0 ? 0 : (frac1 / frac2).toFixed(2)); break;
            }
            break;
        }

        questions.push(answer);
        form.innerHTML += `
          <div class="question">
            ${i+1}. ${questionStr} = 
            <input type="number" step="any" required>
          </div>`;
      }

      startTimer(timeMinutes * 60);
      form.innerHTML += `<button type="submit">Check Answers</button>`;
    }

    function checkAnswers(event) {
      event.preventDefault();
      const inputs = document.querySelectorAll("#quizForm input");
      let correct = 0;
      inputs.forEach((input, i) => {
        let userAns = parseFloat(input.value).toFixed(2);
        let realAns = parseFloat(questions[i]).toFixed(2);
        if (userAns === realAns) {
          input.style.border = "2px solid green";
          correct++;
        } else {
          input.style.border = "2px solid red";
        }
      });
      document.getElementById("result").textContent = `✅ You got ${correct} out of ${questions.length} correct!`;
      document.getElementById("refreshContainer").innerHTML = `<button onclick="startQuiz()">🔄 Try Again</button>`;
      clearInterval(timerCountdown);
    }

    function startTimer(seconds) {
      clearInterval(timerCountdown);
      function updateDisplay() {
        let m = Math.floor(seconds / 60);
        let s = seconds % 60;
        document.getElementById("time").textContent = `${m}:${s.toString().padStart(2, '0')}`;
      }
      updateDisplay();
      timerCountdown = setInterval(() => {
        seconds--;
        updateDisplay();
        if (seconds <= 0) {
          clearInterval(timerCountdown);
          alert("⏰ Time's up!");
        }
      }, 1000);
    }

    function scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Show back to top button
    window.onscroll = function() {
      document.getElementById("topBtn").style.display =
        document.documentElement.scrollTop > 300 ? "block" : "none";
    };
