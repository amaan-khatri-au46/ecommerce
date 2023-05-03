

import { signin } from "../api";
import { getUserInfo, setUserInfo } from "../localStorage";
import { hideLoading, redirectUser, showLoading, showMessage } from "../utils";

// this screen is for user sigin 
// e.preventDefault by calling this line after click on subit button this form will not referesh 
// and post back to the server
// this function is bascially for checking  the valid user if the user is valid it will redirected to hom page
// and if the user is invalid it will say invalid user or password 
// now in the else part we want to save the user information after successful login 
// we are saving the user info in the local storage 
const SiginScreen = {
    after_render: () => {
        document.getElementById('signin-form')
        .addEventListener('submit' , async(e)=>{
            e.preventDefault();
            showLoading();
            const data = await signin ({
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
            <form id="signin-form">
                <ul class="form-items">
                    <li>
                        <h1>Sign-In</h1>
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
                        <button type="submit" class="primary">Signin</button>
                    </li>

                     <!-- here we are creating a new user to sigin in -->
                    <li>
                        <div>
                            New User?
                            <a href="/#/register"> Create your account </a>
                        </div>
                    </li>
                </ul>
            </form>
        </div>
        `;
    },
};

export default SiginScreen;