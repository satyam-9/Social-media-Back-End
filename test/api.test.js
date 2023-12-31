const chai = require("chai");
const expect = chai.expect;
const supertest = require("supertest");
const app = require("../index"); 

describe("Social Media API", () => {


    it("should return a JWT token on successful authentication", (done) => {
        supertest(app)
            .post("/api/authenticate")
            .send({ email: "satyam@example.com", password: "securePassword" })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err); 

                expect(res.body).to.have.property("token");
                done();
            });
    });
    //
    it("should return an error for invalid credentials during authentication", (done) => {

        supertest(app)
            .post("/api/authenticate")
            .send({ email: "satyam@example.com", password: "wrongpassword" })
            .expect(401)
            .end((err, res) => {
                if (err) return done(err);

                expect(res.body).to.have.property(
                    "message",
                    "Authentication failed"
                );
                done();
            });
    });
    it("should successfully follow another user", (done) => {
        // Assuming you have a user ID for testing purposes
        const userIdToFollow = "64de00b0384b6350958924b7";
        const validToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGRjNDg5ZDdhN2M1NzlkZmI2YTFjOTgiLCJpYXQiOjE2OTIyNzQ1ODUsImV4cCI6MTY5MjI3ODE4NX0.g_OfZJRGcKOWJpV1IjZsB79v6I7CO5PyWvUN0-j_q3U"


        supertest(app)
            .post(`/api/follow/${userIdToFollow}`)
            .set("Authorization", `Bearer ${validToken}`)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);

                expect(res.body).to.have.property(
                    "message",
                    "User followed successfully."
                );
                done();
            });
    });

    it("should fail to follow an invalid user", (done) => {
        const invalidUserId = "64de00b0384b6350958924z8";
        const validToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGRjNDg5ZDdhN2M1NzlkZmI2YTFjOTgiLCJpYXQiOjE2OTIyNzQ1ODUsImV4cCI6MTY5MjI3ODE4NX0.g_OfZJRGcKOWJpV1IjZsB79v6I7CO5PyWvUN0-j_q3U"


        supertest(app)
            .post(`/api/follow/${invalidUserId}`)
            .set("Authorization", `Bearer ${validToken}`)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);

                expect(res.body).to.have.property("message", "User not found");
                done();
            });
    });

    it("should successfully add a comment to a post", (done) => {
        // Assuming you have a post ID for testing purposes
        const postId = "64de050039f1ad92566ea965";
        const validToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGRjNDg5ZDdhN2M1NzlkZmI2YTFjOTgiLCJpYXQiOjE2OTIyNzQ1ODUsImV4cCI6MTY5MjI3ODE4NX0.g_OfZJRGcKOWJpV1IjZsB79v6I7CO5PyWvUN0-j_q3U"
        const testingText = "hello"


        supertest(app)
            .post(`/api/comment/${postId}`)
            .set("Authorization", `Bearer ${validToken}`)
            .send({ comment: "This is a test comment" })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);

                expect(res.body).to.have.property(
                    "message",
                    "Comment added successfully"
                );
                done();
            });
    });

    it("should fail to add a comment to an invalid post", (done) => {
        const invalidPostId = "invalid_post_id";

        supertest(app)
            .post(`/api/comment/${invalidPostId}`)
            .set("Authorization", `Bearer ${validToken}`)
            .send({ comment: "This is a test comment" })
            .expect(404)
            .end((err, res) => {
                if (err) return done(err);

                expect(res.body).to.have.property("message", "Post not found");
                done();
            });
    });
    // Write more test cases for other endpoints
});
