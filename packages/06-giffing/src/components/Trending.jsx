import {
	CategoryLink,
	CategoryList,
	CategoryListItem,
	CategoryTitle,
} from '@/assets/style/trendingStyled';

const Trending = ({ name, options = [] }) => {
	return (
		<section>
			<CategoryTitle>{name}</CategoryTitle>
			<CategoryList>
				{options.map((singleOption, index) => (
					<CategoryListItem key={singleOption} index={index} type="primary">
						<CategoryLink to={`/search/${singleOption}`}>{singleOption}</CategoryLink>
					</CategoryListItem>
				))}
			</CategoryList>
		</section>
	);
};

export default Trending;
