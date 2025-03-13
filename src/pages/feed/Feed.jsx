import React, { useState, useEffect, act } from 'react';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { Avatar, List, Space } from 'antd';
import { getActivities, getUserById, getUsers } from '../../apiRequests/cymbalBackend';
import StravaActivityMap from '../../components/stravaActivityMap/StravaActivityMap';

const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
);

const Feed = () => {

    const [activities, setActivities] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const getAllActivities = async () => {
        let response = await getActivities();
        response = response.activities?.map((activity) => {
            return {
                title: activity.name,
                avatar: users.find((user) => user._id === activity.user)?.profile,
                description: (new Date(activity.createdAt).toLocaleDateString()),
                content: `Distance: ${(activity.distance/1000).toFixed(2)} km, Speed: ${(16.7/activity.average_speed).toFixed(2)} min/km`,
                map: activity.map.summary_polyline
            };
        });
        return response;
    };


    useEffect(() => {
        getUsers().then((data) => {
            setUsers(data);
        });
    }, []);

    useEffect(() => {
        getAllActivities().then((data) => {
            setActivities(data);
            setLoading(false);
        });
    }, [users]);

    return (
        <List
            itemLayout="vertical"
            size="large"
            pagination={{
            onChange: (page) => {
                console.log(page);
            },
            pageSize: 5,
            }}
            dataSource={activities}
            footer={
            <div>
                <b>ant design</b> footer part
            </div>
            }
            renderItem={(item) => (
            <List.Item
                key={item.title}
                actions={[
                <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                ]}
                extra={
                <StravaActivityMap summaryPolyline={item.map} />
                }
            >
                <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={item.title}
                description={item.description}
                />
                {item.content}
            </List.Item>
            )}
        />
    );
}

export default Feed;