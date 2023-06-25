
const inputDate = document.querySelector(".dateInput")
const inputFrom = document.querySelector(".fromToInput")
const inputDescr = document.querySelector(".descriptionInput")
const inputAmount = document.querySelector(".amountInput")

const formContainer = document.querySelector(".formContainer")
const buttonContainer = document.querySelector(".buttonsContainer")
const submitBtn = document.querySelector(".submitBtn")
const resetBtn = document.querySelector(".resetBtn")
const tableInfoContainer = document.querySelector(".table")
const errorMsg = document.querySelector(".errorMsg")
const totalContainer = document.querySelector(".totalContainer")
const deleteButton = document.querySelector(".xButton")
const totalAmountContainer = document.querySelector(".totalAmountContainer")

// const totalAmount = 500




//display all entries from database

const showEntries = async () => {
    tableInfoContainer.style.visibility = "visible"
    try {
        const {
            data: { entries },
        } = await axios.get("/api/v1/entries")
        errorMsg.innerHTML = ''
        if (entries.length < 1) {
            errorMsg.innerHTML = '<h3 class="errMsg">Server: Please enter data</h3>'
            tableInfoContainer.style.visibility = 'hidden'
            return
        }
        const allEntries = entries
            .map((entry) => {
                const {
                    _id: entryID,
                    date,
                    from,
                    description,
                    amount,
                } = entry
                
                return `

                <tr class="tableInfo" id="tableRes">
                    <th class="idNo">${entryID}</th>
                    <th class="date">${date}</th>
                    <th class="fromTo">${from}</th>
                    <th class="description">${description}</th>
                    <th class="amount" id="amountId${entryID}">${amount}</th>
                    <th class="xButton" data-id="${entryID}"><button>X</button></th> <!-- data id connect individual buttons with their array entries --!>
                </tr>

                `
            })
            .join('')

        tableInfoContainer.innerHTML = `
            <tr class="tableHead">
            <th>ID</th>
            <th>Date (mm/dd/yyyy)</th>
            <th>From/To</th>
            <th>Description</th>
            <th>Amount (£)</th>
            
            </tr>` + allEntries

    } catch (error) {
        errorMsg.innerHTML = '<h3 class="errMsg">Server: You need to enter information</h3>'
    }
    tableInfoContainer.style.visibility = 'visible'

}




//show total function, request from server and push into HTML

const showTotal = async () => {
    totalAmountContainer.style.visibility = "visible"
    try {
        const {
            data: { amounts },
        } = await axios.get("/api/v1/entries")
        
        if (amounts.length < 1) {
            errorMsg.innerHTML = '<h3 class="errMsg">Server: Please enter data</h3>'
            totalAmountContainer.style.visibility = 'hidden'
            return
        }
        const sum = amounts
            .map((entry) => {
                const {
                    total,
                } = entry

            
                return `
    
               
                <th class="amountClass">${total}</th>
                

                
                `
            })
            .join('')
            totalAmountContainer.innerHTML =  ` 
                
                <tr class="totalContainer">
                    
                    <th class="totalAmountDescr" >Total: £</th>
                
                 ` + sum + "</tr>"
            
    } catch (error) {
        errorMsg.innerHTML = '<h3 class="errMsg">Server: Please enter data</h3>'
    }
    totalAmountContainer.style.visibility = 'visible'

}
showEntries()
showTotal()


// add a new entry

submitBtn.addEventListener("click", async (e) => {
    e.preventDefault()
    const date1 = inputDate.value
    const date = inputDate.value
    const from = inputFrom.value
    const description = inputDescr.value
    const amount = inputAmount.value

    try {
        await axios.post('/api/v1/entries', { date1, date, from, description, amount })
        showEntries()
        showTotal()
        // showEntries()    implement to displayy all entries with freshly added
        inputDate.value = ''
        inputFrom.value = ''
        inputDescr.value = ''
        inputAmount.value = ''


    } catch (error) {
        console.log("error")
        errorMsg.innerHTML = `<h3 class="errMsg">Server: Please enter correct data: ${error}</h3>`
    }
})

//app.delete("/api/simpleLedger/entry/:id")   -delete entry
//app.delete("/api/simpleLedger/entry")       -delete entries

//delete entry

tableInfoContainer.addEventListener('click', async (e) => {
    const el = e.target

    if (el.parentElement.classList.contains("xButton")) {
        tableInfoContainer.style.visibility = "visible"
        const id = el.parentElement.dataset.id
        try {
            await axios.delete(`/api/v1/entries/${id}`)
            showEntries()
            showTotal()
        } catch (error) {
            console.log(error);
        }
        tableInfoContainer.style.visibility = "hidden"
    }
})

//reset entire database

resetBtn.addEventListener("click", async (e) => {
    e.preventDefault()
    try {
        await axios.delete('/api/v1/entries')
        showEntries()
        showTotal()
        // showEntries()    implement to displayy all entries with freshly added
        inputDate.value = ''
        inputFrom.value = ''
        inputDescr.value = ''
        inputAmount.value = ''


    } catch (error) {
        console.log("error")
    }
})


// total grab amounts from MongoDB and push them to local array, would be more efficient if this process would be run on the mongoDB and request and response in here ---- see mongoDBQueries folder

