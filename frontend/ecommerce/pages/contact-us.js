import React from 'react'

function contactUs() {
    return (
        <><h3 id="msg">How can we HELP you today?!</h3>
            <br />
            <p>Please send us a Message!</p>

            <form action="message.php" method="post">
                <table class="table">
                    <tr class="orderForm">
                        <td><label for="name">Name:</label></td>
                        <td>
                            <input
                                type="text"
                                name="name"
                                id="Cname"
                                placeholder="Your name:"
                                required
                            />
                        </td>
                    </tr>
                    <tr>
                        <td><label for="email">Your email:</label></td>
                        <td>
                            <input
                                type="text"
                                name="email"
                                id="email"
                                placeholder="Your email address.."
                                required
                            />
                        </td>
                    </tr>
                    <tr>
                        <td><label for="subject">Subject:</label></td>
                        <td>
                            <input
                                type="text"
                                name="subject"
                                id="subject"
                                placeholder="subject"
                                required
                            />
                        </td>
                    </tr>
                    <tr>
                        <td><label for="phone">Phone Number</label></td>
                        <td><input type="text" id="phone" name="phone" required /></td>
                    </tr>

                    <tr>
                        <td><label for="message">Message:</label></td>
                        <td>
                            <textarea
                                name="message"
                                id="message"
                                cols="50"
                                rows="10"
                                placeholder="Write your concerns here.."
                            ></textarea>
                        </td>
                    </tr>
                    <tr>
                        <td><input type="submit" name="send" id="send" /></td>
                    </tr>
                </table>
            </form>
            {/* <div>contactUs</div> */}
        </>
    )
}

export default contactUs