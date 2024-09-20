// Validation Function
const validateEmail = function(email) {
	const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	return regex.test(email);
}

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('subscribe-box')

    form.addEventListener('submit', function (event) {
        event.preventDefault()

        const emailInput = document.getElementById('email')
        const email = emailInput.value

        // Verifying subscription
        const subscribe = function() {
            let input = document.querySelector('#subscribe-box input[type="text"]').value;

            if(!validateEmail(input)) {
                document.querySelector('#subscribe-box .error-message').classList.add('active');
                setTimeout(function() {
                    document.querySelector('#subscribe-box .error-message').classList.remove('active');
                }, 3000);
            } else {
                fetch('/subscribe/email', {
                    method: 'POST',
                    body: JSON.stringify({
                        "email" : input
                    }),
                    headers: {
                        'content-type': 'application/json'
                    }
                })
				.then(response => response.json())
				.then(data => {
					console.log(data);
					localStorage.setItem('#subscribe', input);
				})
				.catch(error => {
					document.querySelector('#subscribe-box .error-message').textContent = getResponse.message;
                	document.querySelector('#subscribe-box .error-message').classList.add('active');
					setTimeout(function() {
                        document.querySelector('#subscribe-box .error-message').classList.remove('active');
                    }, 3000);
					console.error('Error:', error)
				});
            }
        };

        // If the user clicks subscribe submit their subscription
        document.querySelector('#subscribe-box input[type="submit"]').addEventListener('click', function(e) {
            subscribe();
        });

        // If the user presses enter submit their subscription
        document.querySelector('#subscribe-box input[type="text"]').addEventListener('keydown', function(e) {
            if(e.keyCode === 13) {
                subscribe();
            }
        });
    })
})