T9n.setLanguage('en');
AccountsTemplates.configure({
    // defaultLayout: 'emptyLayout',
    showForgotPasswordLink: true,
    overrideLoginErrors: true,
    enablePasswordChange: true,

    // sendVerificationEmail: true,
    // enforceEmailVerification: true,
    //confirmPassword: true,
    //continuousValidation: false,
    //displayFormLabels: true,
    //forbidClientAccountCreation: true,
    //formValidationFeedback: true,
    //homeRoutePath: '/',
    //showAddRemoveServices: false,
    //showPlaceholders: true,

    negativeValidation: true,
    positiveValidation: true,
    negativeFeedback: false,
    positiveFeedback: true,

    // Privacy Policy and Terms of Use
    //privacyUrl: 'privacy',
    //termsUrl: 'terms-of-use',
    onSubmitHook: function(error, state) {
        if (!error) {
            if (state === "signIn") {
                // Successfully logged in
                Materialize.toast('Đăng nhập thành công', 3000, 'rounded');
            }
            if (state === "signUp") {
                // Successfully registered
                Materialize.toast('Đăng kí thành công', 3000, 'rounded');
            }
        }
        else {
            Materialize.toast('Lỗi Form', 3000, 'rounded');
        }
    },
    onLogoutHook: function () {
        Materialize.toast('Đã đăng xuất khỏi Tìm Trọ', 3000, 'rounded');
    }
});

AccountsTemplates.configure({
    texts: {
        navSignIn: "Đăng nhập",
        navSignOut: "Đăng xuất",
        pwdLink_pre: "",
        pwdLink_link: "Quên mật khẩu",
        pwdLink_suff: "",
        signInLink_pre: "Nếu đã có tài khoản?",
        signInLink_link: "Đăng nhập",
        signInLink_suff: "",
        signUpLink_pre: "Chưa có tài khoản?",
        signUpLink_link: "Đăng kí ngay",
        signUpLink_suff: "",
        title: {
            changePwd: "Đổi mật khẩu",
            forgotPwd: "Quên mật khẩu",
            signIn: "Đăng nhập",
            signUp: "Đăng kí tài khoản"
        },
        button: {
            changePwd: "Thay đổi",
            forgotPwd: "Xác nhận",
            signIn: "Đăng Nhập",
            signUp: "Đăng Kí"
        },
        errors: {
            loginForbidden: "error.accounts.Đăng nhập lỗi",
            mustBeLoggedIn: "error.accounts.Cần phải đăng nhập để có thể đăng bài",
            pwdMismatch: "Mật khẩu không khớp"
        }
    }
});

// AccountsTemplates.addField({
//     _id: 'password',
//     type: 'password',
//     displayName: "Mật khẩu",
//     placeholder: {
//         signUp: "Phải có đủ 6 ký tự"
//     },
//     required: true,
//     minLength: 6,
//     errStr: 'Phải có đủ 6 ký tự'
// });
var pwd = AccountsTemplates.removeField('password');
AccountsTemplates.removeField('email');
AccountsTemplates.addFields([{
        _id: "username",
        type: "text",
        displayName: "Username",
        required: true,
        minLength: 5
    }, {
        _id: 'email',
        type: 'email',
        required: true,
        displayName: "Email",
        re: /.+@(.+){2,}\.(.+){2,}/,
        errStr: 'Invalid email'
    }, {
        _id: 'username_and_email',
        type: 'text',
        required: true,
        displayName: "Username/Email"
    },
    pwd
]);