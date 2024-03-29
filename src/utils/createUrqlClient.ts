import { dedupExchange, fetchExchange } from "urql";
import { LoginMutation, MeQuery, MeDocument, RegisterMutation, LogoutMutation } from "../generated/graphql";
import { cacheExchange } from '@urql/exchange-graphcache'
import { betterUpdateQuery } from "./betterUpdateQuery";

export const createUrqlClient = (ssrExchange: any) => ({
    url: 'http://localhost:4000/graphql',
    fetchOptions: {
        credentials: "include" as const // graphql helper to show cookies in localhost network and graphql sendbox.
    },
    exchanges: [dedupExchange, cacheExchange({
        updates: {
            Mutation: {
                login: (_result, args, cache, info) => {
                    betterUpdateQuery<LoginMutation, MeQuery>(cache,
                        { query: MeDocument },
                        _result,
                        (result, query) => {
                            if (result.login.errors) {
                                return query;
                            } else {
                                return {
                                    me: result.login.user
                                }
                            }
                        }
                    )
                },
                register: (_result, args, cache, info) => {
                    betterUpdateQuery<RegisterMutation, MeQuery>(cache,
                        { query: MeDocument },
                        _result,
                        (result, query) => {
                            if (result.register.errors) {
                                return query;
                            } else {
                                return {
                                    me: result.register.user
                                }
                            }
                        }
                    )
                },
                logout: (_result, args, cache, info) => {
                    betterUpdateQuery<LogoutMutation, MeQuery>(
                        cache,
                        { query: MeDocument },
                        _result,
                        () => ({ me: null })
                    )
                }
            }
        }
    }), 
    ssrExchange,
    fetchExchange]
})