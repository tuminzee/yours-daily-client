function getData() {
    return {
        formData: {
            email: "",
        },
        status: false,
        loading: false,
        isError: false,
        modalHeaderText: "",
        modalBodyText: "",
        buttonLabel: 'Submit',
        isEmail(email) {
            var re = /\S+@\S+\.\S+/;
            return re.test(email);
        },

        submitData() {
            // Ensures all fields have data before submitting
            if (!this.formData.email.length) {
                alert("Please fill out all required field and try again!")
                return;
            }
            this.buttonLabel = 'Submitting...'
            this.loading = true;
            fetch('https://bh4klbbs7i.execute-api.ap-south-1.amazonaws.com/postEmail', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.formData)
                })
                .then((response) => {
                    console.log(response);
                    if (response.status === 200) {
                        this.modalHeaderText = "Congratulations!!!"
                        this.modalBodyText = "You have been successfully registered!";
                        this.status = true;
                    } else {
                        throw new Error("Your registration failed");
                    }
                })
                .catch((error) => {
                    this.modalHeaderText = "Ooops Error!"
                    this.modalBodyText = error.message;
                    this.isError = true;
                })
                .finally(() => {
                    this.loading = false;
                    this.buttonLabel = 'Submit'
                })
        }
    }
}