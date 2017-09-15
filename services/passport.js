const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");
const User = mongoose.model("users");

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id).then(user => {
		done(null, user);
	});
});

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: "/auth/google/callback",
			proxy: true
		},
		(accessToken, refreshToken, profile, done) => {
			User.findOne({ googleID: profile.id }).then(existingUser => {
				if (existingUser) {
					// already have a record with id
					done(null, existingUser);
				} else {
					// we dont have record with id, make new 1
					new User({ googleID: profile.id })
						.save()
						.then(user => done(null, user));
				}
			});

			console.log("access token", accessToken);
			console.log("refresh token", refreshToken);
			console.log("profile", profile);
			console.log(accessToken);
		}
	)
);
