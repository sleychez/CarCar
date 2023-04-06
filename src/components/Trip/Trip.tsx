import React, {FC} from 'react';
import {Items} from "../../redux/features/trips/tripsSlice";

type TripProps = {
    item: Items
}

const Trip: FC<TripProps> = ({item}) => {
    return (
        <div>
            <div>
                {item.from}
            </div>
            <div>
                {item.to}
            </div>
            <div>
                {item.cost}
            </div>
            <div>
                {item.user}
            </div>
            </div>
    )
}

export default Trip;