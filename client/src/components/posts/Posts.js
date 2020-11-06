import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PostItem from "./PostItem";
import PostForm from "./PostForm";
import LeftSidebar from "../layout/LeftSidebar";
import { getPosts } from "../../actions/post";
import styles from "./Posts.module.css";

const Posts = ({ getPosts, post: { posts } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <>
      <div className={styles.postsContainer}>
        <div className={styles.leftColumn}>
          <div className={styles.fixedColumnLeft}>
            <LeftSidebar />
          </div>
        </div>
        <div className={styles.middleColumn}>
          <PostForm />
          <div className='posts'>
            {posts.map((post) => (
              <PostItem key={post._id} post={post} />
            ))}
          </div>
        </div>
        <div className={styles.rightColumn}>
          <div className={styles.fixedColumnRight}>
            <h5 className={styles.trendingTitle}>Trending Weekly Top 10</h5>
            <div className={styles.trendingSongs}>
              <ol>
                <li className={styles.trendingSong}> Nick Lace - Kobe</li>
                <li className={styles.trendingSong}>Nick Lace - Kobe</li>
                <li className={styles.trendingSong}>Nick Lace - Kobe</li>
                <li className={styles.trendingSong}>Nick Lace - Kobe</li>
                <li className={styles.trendingSong}>Nick Lace - Kobe</li>
                <li className={styles.trendingSong}>Nick Lace - Kobe</li>
                <li className={styles.trendingSong}>Nick Lace - Kobe</li>
                <li className={styles.trendingSong}>Nick Lace - Kobe</li>
                <li className={styles.trendingSong}>Nick Lace - Kobe</li>
                <li className={styles.trendingSong}>Nick Lace - Kobe</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPosts })(Posts);
