/*

  Challenge 3: Most Common Subscription for Harsh Reviewers

  Find the most common subscription among users who dislike more movies than they like.
  Use the methods in utils/mocked-api to get user and rating data.
  Check each user's likes vs. dislikes, filter those with more dislikes, and return the most frequent subscription.

  Requesites:
    - Use await with the methods from utils/mocked-api to get the data
    - Make sure to return a string containing the name of the most common subscription
*/

const { getUserSubscriptionByUserId, getUsers, getLikedMovies, getDislikedMovies } = require("./utils/mocked-api");

/**
 * Logs the most common subscription among users
 * who disliked more movies than they liked.
 *
 * @returns {Promise<string>} Logs the subscription name as a string.
 */
const getCommonDislikedSubscription = async () => {
  // Add your code here
  try{
    const [users, likedMovies, dislikedMovies] = await Promise.all([
      getUsers(),
      getLikedMovies(),
      getDislikedMovies()
    ]);

    let harshUsers = users.filter((user) => {
      let dislikedMoviesCount = dislikedMovies.find( movie => movie.userId === user.id)?.movies.length || 0
      let likedMoviesCount = likedMovies.find( movie => movie.userId === user.id)?.movies.length || 0
      return dislikedMoviesCount > likedMoviesCount
    })
    
    let userSubscriptions = await Promise.all( harshUsers.map((user) => {
      return getUserSubscriptionByUserId(user.id)
    }))

    const countedSubscriptions = userSubscriptions.reduce((accu, val) => {
      accu[val.subscription] = ( accu[val.subscription] || 0) + 1
      return accu
    }, {})

    const commonSubscription = Object.keys(countedSubscriptions)?.reduce((result, value) => {
      return countedSubscriptions[result] > countedSubscriptions[value] ? result : value
    });

    return commonSubscription
  }catch(error){
    console.log(error)
    throw error
  }
};

getCommonDislikedSubscription().then((subscription) => {
  console.log("Common more dislike subscription is:", subscription);
});
