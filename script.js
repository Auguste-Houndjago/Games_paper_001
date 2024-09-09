let score=0;
const opts = {
	R: {
		icon:"✊",
		winner: "Scissors"
	},
	P: {
	icon:"✋",
	winner: "Rock"	
},
	S: {
		icon:"✌️",
		winner: "Paper"
	},
	default: {
		icon:"✊",
		winner: ""
	}
};
const choices = {
	user: "default",
	cpu: "default"
};
const inplay=["oh the suspense...","we await the verdict","patiently waiting for a winner","maybe, maybe, maybe, maybe", "who will win?"]


const choiceBtns = document.querySelectorAll("button");
	const user = document.querySelector("#user");
	const cpu = document.querySelector("#cpu");
	user.addEventListener("animationend", animationListen, false);
	cpu.addEventListener("animationend", animationListen, false);

function anim(choice) {
	for (let i of choiceBtns) {
		i.disabled = true;
	}
	choices.user = choice;
	choices.cpu= choiceBtns[Math.floor(Math.random() * 3)].innerText
	user.classList.add("animate");
	cpu.classList.add("animate");
	document.querySelector("#feedback").innerText=inplay[Math.floor(Math.random() * inplay.length)]
	user.querySelector(".curr").innerText = opts.default.icon;
	cpu.querySelector(".curr").innerText = opts.default.icon;
}

function animationListen(ev) {
	if (ev.type === "animationend") {
		if (ev.animationName === "rps") {
			ev.srcElement.parentNode.parentNode.classList.remove("animate");
			for (let i of choiceBtns) {
				i.disabled = false;
			}
			if(ev.srcElement.parentNode.parentNode.id==="user"){
			document.querySelector("#feedback").innerText=result();
			document.querySelector("#score").innerText=score;
			}
		} else {
			ev.srcElement.innerText=opts[choices[ev.srcElement.parentNode.parentNode.id]].icon
		}
	}
}


function result() {
	if(choices.user===choices.cpu) {
		return "It's a tie 👔"
	} else if(choices.cpu===opts[choices.user].winner) {
		score++;
		return "You Win 🎉"
	} else {
		score=0;
		return "You Lose 😭"
	}

}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
        console.log('ServiceWorker registration successful');
      }, function(err) {
        console.log('ServiceWorker registration failed: ', err);
      });
    });
  }