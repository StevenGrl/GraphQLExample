<?php
//
//namespace App\GraphQL\Subscriptions;
//
//use Illuminate\Http\Request;
//use Nuwave\Lighthouse\Schema\Types\GraphQLSubscription;
//use Nuwave\Lighthouse\Subscriptions\Subscriber;
//
//final class ArticleAdded extends GraphQLSubscription
//{
//    /**
//     * Check if subscriber is allowed to listen to the subscription.
//     * @param Subscriber $subscriber
//     * @param Request $request
//     * @return bool
//     */
//    public function authorize(Subscriber $subscriber, Request $request): bool
//    {
//        return true;
//    }
//
//    /**
//     * Filter which subscribers should receive the subscription.
//     * @param Subscriber $subscriber
//     * @param mixed $root
//     * @return bool
//     */
//    public function filter(Subscriber $subscriber, mixed $root): bool
//    {
//        return true;
//    }
//}
