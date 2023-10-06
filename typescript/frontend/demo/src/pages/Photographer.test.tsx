import { shallow } from "enzyme";
import Photographer from "./Photographer";
import Header from "@/components/Header";
import Body from "@/components/Body";
import Footer from "@/components/Footer";

describe('Check all component rendering in Photographer.tsx',() => {
    it('Photographer page rendered',() => {
        shallow(<Photographer/>);
    })

    it('Header component rendered',() => {
        const wrapper = shallow(<Photographer/>);
        expect(wrapper.contains(<Header/>)).toBe(true);
    })

    it('Body component rendered',() => {
        const wrapper = shallow(<Photographer/>);
        expect(wrapper.contains(<Body/>)).toBe(true);
    })

    it('Footer component rendered',() => {
        const wrapper = shallow(<Photographer/>);
        expect(wrapper.contains(<Footer/>)).toBe(true);
    })
})