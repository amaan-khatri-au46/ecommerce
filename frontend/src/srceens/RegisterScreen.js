

import { register } from "../api";
import { getUserInfo, setUserInfo } from "../localStorage";
import { hideLoading, redirectUser, showLoading, showMessage } from "../utils";

// this screen is for user Register 
// e.preventDefault by calling this line after click on subit button this form will not referesh 
// and post back to the server
// this function is bascially for checking  the valid user if the user is valid it will redirected to hom page
// and if the user is invalid it will say invalid user or password 
// now in the else part we want to save the user information after successful login 
// we are saving the user info in the local storage 
const RegisterScreen = {
    after_render: () => {
        document.getElementById('register-form')
        .addEventListener('submit' , async(e)=>{
            e.preventDefault();
            showLoading();
            const data = await register ({
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                password: document.getElementById('password').value
            });
            hideLoading();
            if(data.error){
                showMessage(data.error);
            }else{
                setUserInfo(data);
                redirectUser();
            }
        });
    },
    render: () => {
        if(getUserInfo().name){
            redirectUser();
        }
        return`
        <div class="form-container">
            <form id="register-form">
                <ul class="form-items">
                    <li>
                        <h1>Create Account</h1>
                    </li>

                    <li>
                    <label for="name">Name</label>
                    <input type="name" name="name" id="name"/>
                    </li>

                    <li>
                    <label for="email">Email</label>
                    <input type="email" name="email" id="email"/>
                    </li>
                    
                    <li>
                        <label for="password">Password</label>
                        <input type="password" name="password" id="password"/>
                    </li>

                    <li>
                        <label for="repassword">Re-Enter Password</label>
                        <input type="password" name="repassword" id="repassword"/>
                    </li>

                    <li>
                        <button type="submit" class="primary">Register</button>
                    </li>

                     <!-- here we are creating a new user to Register in -->
                    <li>
                        <div>
                            Already have an account?
                            <a href="/#/signin"> Sign-In </a>
                        </div>
                    </li>
                </ul>
            </form>
        </div>
        `;
    },
};

export default RegisterScreen;