import { View, Text, FlatList } from 'react-native'
import React, { useEffect } from 'react'

import useOrderStore from '../store/orderStore'
import usePenseStore from '../store/penseStore'

const OrderLog = () => {

    const { orders, fetchOrders } = useOrderStore()
    const { currentPenseId } = usePenseStore();

    useEffect(() => {
        if (currentPenseId) {
            fetchOrders(currentPenseId);
        }
    }, [currentPenseId]);


    return (
        orders.length === 0 ? (
            <View className='bg-white rounded-2xl p-4 shadow-md mx-6 mt-4 px-2 flex-1 justify-center items-center'>
                <View className="bg-white p-3 rounded-xl my-1 mx-3 shadow-md self-center justify-center">
                    <Text className="text-lg text-primary">
                        No orders yet. Add one!
                    </Text>
                </View>
            </View>
        ) : (
            <FlatList
                className='bg-white rounded-2xl p-4 shadow-md mx-6 mt-4 px-2'
                data={orders}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => {
                    const hasPrice = item.itemPrice !== null && item.itemPrice > 0;

                    return (
                        <View className="bg-white p-3 rounded-xl my-1 mx-3 shadow-md self-end">
                            <Text className="text-lg text-primary">
                                {item.qty} {item.item.toLowerCase()} for {item.person.toLowerCase()}
                            </Text>
                            {!hasPrice && (
                                <Text className="text-red-500 text-lg font-bold">~~~~~</Text>
                            )}
                        </View>
                    );
                }}
            />
        )
    )
}

export default OrderLog