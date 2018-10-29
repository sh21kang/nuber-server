import { withFilter } from "graphql-yoga";
import User from "../../../entities/User";

const resolvers = {
  Subscription: {
    RideStatusSubscription: {
      subscribe: withFilter(
        (_, __, { pubSub }) => pubSub.asyncIterator("rideUpdate"),
        (payload, _, { context }) => {
          const user: User = context.currentUser;
          console.log('pay', payload);
          const {
            RideStatusSubscription: { driverId, passengerId }
          } = payload;
          console.log(user.id === driverId || user.id === passengerId);
          return user.id === driverId || user.id === passengerId;
        }
      )
    }
  }
};

export default resolvers;
