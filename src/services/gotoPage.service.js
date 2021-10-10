import eventBus from '@/services/eventBus.service';

const gotoPage = (viewName, viewParams) => eventBus.$emit('gotoPage', viewName, viewParams);

export default gotoPage;
